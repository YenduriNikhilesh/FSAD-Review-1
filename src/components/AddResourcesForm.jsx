import { useState } from "react";
import axios from "axios";

export default function AddResourceForm({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    domain: "",
    type: "",
    previewUrl: "",
    fileUrl: ""
  });

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8080/api/research/add", form);

      alert("✅ Added successfully");

      setForm({
        title: "",
        category: "",
        domain: "",
        type: "",
        previewUrl: "",
        fileUrl: ""
      });

      refresh(); // reload data

    } catch (err) {
      alert("❌ Error adding resource");
    }
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg mb-6">
      <h2 className="text-white mb-3 font-bold">Add Resource</h2>

      <input placeholder="Title"
        value={form.title}
        onChange={e => setForm({...form, title: e.target.value})}
        className="input" />

      <input placeholder="Category"
        value={form.category}
        onChange={e => setForm({...form, category: e.target.value})}
        className="input" />

      <input placeholder="Domain (research/career...)"
        value={form.domain}
        onChange={e => setForm({...form, domain: e.target.value})}
        className="input" />

      <input placeholder="Type (subject/journal...)"
        value={form.type}
        onChange={e => setForm({...form, type: e.target.value})}
        className="input" />

      <input placeholder="Preview URL"
        value={form.previewUrl}
        onChange={e => setForm({...form, previewUrl: e.target.value})}
        className="input" />

      <input placeholder="File URL"
        value={form.fileUrl}
        onChange={e => setForm({...form, fileUrl: e.target.value})}
        className="input" />

      <button
        onClick={handleSubmit}
        className="bg-emerald-500 px-4 py-2 mt-3 rounded text-white"
      >
        Add
      </button>
    </div>
  );
}