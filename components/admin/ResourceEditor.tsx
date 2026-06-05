"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormField, FormSchema } from "@/lib/admin-forms";

type Row = Record<string, any>;

/* Generic create/read/update/delete editor driven by a FormSchema.
   Used for 施術事例 / お知らせ / お客様の声. Talks to the
   /api/admin/<resource> route handlers. */

export default function ResourceEditor({ schema }: { schema: FormSchema }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState("");

  // editing === null → list view; otherwise the form is open.
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState<Row>({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setListError("");
    try {
      const res = await fetch(`/api/admin/${schema.key}`, {
        cache: "no-store",
      });
      const json = await res.json();
      if (!res.ok) {
        setListError(json.error || "読み込みに失敗しました。");
        return;
      }
      setRows(json.data ?? []);
    } catch {
      setListError("通信に失敗しました。");
    } finally {
      setLoading(false);
    }
  }, [schema.key]);

  useEffect(() => {
    load();
  }, [load]);

  function startCreate() {
    setForm({ ...schema.defaults });
    setEditing({});
    setFormError("");
  }

  function startEdit(row: Row) {
    setForm({ ...row });
    setEditing(row);
    setFormError("");
  }

  function cancel() {
    setEditing(null);
    setForm({});
    setFormError("");
  }

  function setField(name: string, value: unknown) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function save() {
    setSaving(true);
    setFormError("");

    // Build payload from schema fields, skipping empty datetime so the
    // NOT NULL default (now()) applies and existing values are kept.
    const payload: Row = {};
    for (const field of schema.fields) {
      const v = form[field.name];
      if (field.type === "datetime" && (v === "" || v == null)) continue;
      payload[field.name] = v ?? null;
    }

    const isNew = !editing?.id;
    const url = isNew
      ? `/api/admin/${schema.key}`
      : `/api/admin/${schema.key}/${editing!.id}`;

    try {
      const res = await fetch(url, {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setFormError(json.error || "保存に失敗しました。");
        return;
      }
      cancel();
      await load();
    } catch {
      setFormError("通信に失敗しました。");
    } finally {
      setSaving(false);
    }
  }

  async function remove(row: Row) {
    if (!confirm("この項目を削除します。よろしいですか？")) return;
    try {
      const res = await fetch(`/api/admin/${schema.key}/${row.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const json = await res.json();
        alert(json.error || "削除に失敗しました。");
        return;
      }
      await load();
    } catch {
      alert("通信に失敗しました。");
    }
  }

  /* ─────────────────────────── Render ─────────────────────────── */

  if (editing) {
    return (
      <FormView
        schema={schema}
        form={form}
        setField={setField}
        onSave={save}
        onCancel={cancel}
        saving={saving}
        error={formError}
        isNew={!editing.id}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl">{schema.label}</h1>
        <button
          onClick={startCreate}
          className="rounded-full bg-sunset text-midnight font-bold px-5 py-2 hover:opacity-90 transition"
        >
          ＋ 新規追加
        </button>
      </div>

      {loading && <p className="text-midnight/50">読み込み中…</p>}
      {listError && <p className="text-red-600">{listError}</p>}

      {!loading && !listError && rows.length === 0 && (
        <p className="text-midnight/50 py-8">
          まだ項目がありません。「新規追加」から作成してください。
        </p>
      )}

      <ul className="space-y-3">
        {rows.map((row) => (
          <li
            key={row.id}
            className="flex items-center gap-4 rounded-xl border border-midnight/10 bg-white p-4"
          >
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">
                {row[schema.titleField] || "（無題）"}
              </div>
              {schema.subtitleField && row[schema.subtitleField] && (
                <div className="text-sm text-midnight/50 truncate">
                  {row[schema.subtitleField]}
                </div>
              )}
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                row.published
                  ? "bg-green-100 text-green-700"
                  : "bg-midnight/10 text-midnight/50"
              }`}
            >
              {row.published ? "公開中" : "非公開"}
            </span>
            <button
              onClick={() => startEdit(row)}
              className="text-sm px-3 py-1.5 rounded-lg border border-midnight/20 hover:bg-midnight/5"
            >
              編集
            </button>
            <button
              onClick={() => remove(row)}
              className="text-sm px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────────────────────── Form ───────────────────────────── */

function FormView({
  schema,
  form,
  setField,
  onSave,
  onCancel,
  saving,
  error,
  isNew,
}: {
  schema: FormSchema;
  form: Row;
  setField: (name: string, value: unknown) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  error: string;
  isNew: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl">
          {schema.label}：{isNew ? "新規追加" : "編集"}
        </h1>
        <button onClick={onCancel} className="text-sm text-midnight/60 hover:underline">
          ← 一覧に戻る
        </button>
      </div>

      <div className="space-y-5 bg-white rounded-2xl border border-midnight/10 p-6">
        {schema.fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            value={form[field.name]}
            onChange={(v) => setField(field.name, v)}
          />
        ))}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            onClick={onSave}
            disabled={saving}
            className="rounded-full bg-sunset text-midnight font-bold px-6 py-2.5 hover:opacity-90 transition disabled:opacity-50"
          >
            {saving ? "保存中…" : "保存"}
          </button>
          <button
            onClick={onCancel}
            disabled={saving}
            className="rounded-full border border-midnight/20 px-6 py-2.5 hover:bg-midnight/5 transition"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const label = (
    <label className="block text-sm font-medium mb-1.5">{field.label}</label>
  );
  const help = field.help && (
    <p className="text-xs text-midnight/50 mt-1">{field.help}</p>
  );
  const base =
    "w-full rounded-lg border border-midnight/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sunset";

  switch (field.type) {
    case "textarea":
      return (
        <div>
          {label}
          <textarea
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={5}
            className={base}
          />
          {help}
        </div>
      );

    case "number":
      return (
        <div>
          {label}
          <input
            type="number"
            value={value == null ? "" : (value as number)}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={base}
          />
          {help}
        </div>
      );

    case "checkbox":
      return (
        <div>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => onChange(e.target.checked)}
              className="w-5 h-5 accent-sunset"
            />
            <span className="text-sm font-medium">{field.label}</span>
          </label>
          {help}
        </div>
      );

    case "color":
      return (
        <div>
          {label}
          <input
            type="color"
            value={(value as string) || "#ff6b1a"}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-20 rounded border border-midnight/20 cursor-pointer"
          />
          {help}
        </div>
      );

    case "datetime":
      return (
        <div>
          {label}
          <input
            type="datetime-local"
            value={toLocalInput(value as string)}
            onChange={(e) =>
              onChange(e.target.value ? new Date(e.target.value).toISOString() : "")
            }
            className={base}
          />
          {help}
        </div>
      );

    case "image":
      return (
        <div>
          {label}
          <ImageField value={(value as string) ?? ""} onChange={onChange} />
          {help}
        </div>
      );

    default:
      return (
        <div>
          {label}
          <input
            type="text"
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={base}
          />
          {help}
        </div>
      );
  }
}

function ImageField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: unknown) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  async function upload(file: File) {
    setUploading(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) {
        setErr(json.error || "アップロードに失敗しました。");
        return;
      }
      onChange(json.url);
    } catch {
      setErr("通信に失敗しました。");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {value && (
        <div className="mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="preview"
            className="max-h-40 rounded-lg border border-midnight/10"
          />
        </div>
      )}
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
          }}
          className="text-sm"
        />
        {uploading && <span className="text-sm text-midnight/50">アップロード中…</span>}
        {value && !uploading && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-sm text-red-600 hover:underline"
          >
            画像を削除
          </button>
        )}
      </div>
      {err && <p className="text-red-600 text-sm mt-1">{err}</p>}
    </div>
  );
}

/** ISO string → value for <input type="datetime-local"> (local TZ). */
function toLocalInput(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}
