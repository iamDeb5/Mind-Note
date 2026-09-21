import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNote } from "../hooks/useNote";

const Notes = () => {
  const { user, handleLogout } = useAuth();
  const {
    notes,
    archivedNotes,
    trashedNotes,
    loading,
    error,
    handleFetchNotes,
    handleFetchArchivedNotes,
    handleFetchTrashedNotes,
    handleCreateNote,
    handleUpdateNote,
    handleDeleteNote,
    handlePinNote,
    handleArchiveNote,
    handleRestoreNote,
    handleDeleteNotePerm,
  } = useNote();

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (activeTab === "all") {
      const params = {};
      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (selectedTag) params.tag = selectedTag;
      handleFetchNotes(params);
    } else if (activeTab === "archive") {
      handleFetchArchivedNotes();
    } else if (activeTab === "trash") {
      handleFetchTrashedNotes();
    }
  }, [activeTab, searchQuery, selectedTag]);

  const openNewNoteModal = () => {
    setEditingNoteId(null);
    setTitle("");
    setContent("");
    setTagsInput("");
    setIsComposerOpen(true);
  };

  const openEditModal = (note) => {
    setEditingNoteId(note._id);
    setTitle(note.title);
    setContent(note.content);
    setTagsInput(Array.isArray(note.tags) ? note.tags.join(", ") : "");
    setIsComposerOpen(true);
  };

  const closeComposer = () => {
    setIsComposerOpen(false);
    setEditingNoteId(null);
    setTitle("");
    setContent("");
    setTagsInput("");
  };

  const handleSubmitNote = async (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    const parsedTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: title.trim(),
      content: content.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ["General"],
    };

    if (editingNoteId) {
      await handleUpdateNote(editingNoteId, payload);
    } else {
      await handleCreateNote(payload);
    }

    closeComposer();
  };

  const baseList =
    activeTab === "all"
      ? notes
      : activeTab === "archive"
      ? archivedNotes
      : trashedNotes;

  const displayedNotes = baseList.filter((note) => {
    if (activeTab === "all") return true;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      note.title?.toLowerCase().includes(q) ||
      note.content?.toLowerCase().includes(q)
    );
  });

  const pinnedNotes = displayedNotes.filter((n) => n.pinned && !n.trashed);
  const regularNotes = displayedNotes.filter((n) => !n.pinned && !n.trashed);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-zinc-900 font-['Inter',sans-serif] flex flex-col selection:bg-zinc-200">
      {/* Sticky Header with Absolute Centered Tabs and Non-Wrapping Actions */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-[#fafaf9]/90 border-b border-zinc-200/80 px-4 sm:px-6 py-3.5">
        <div className="max-w-6xl mx-auto relative flex items-center justify-between gap-4">
          {/* Left: Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-semibold text-base sm:text-lg tracking-tight shrink-0"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#2e7d32]" />
            <span>Mind Note</span>
          </Link>

          {/* Center Column: Perfectly Centered Tabs */}
          <div className="hidden sm:flex sm:absolute sm:left-1/2 sm:-translate-x-1/2 items-center justify-center">
            <nav className="flex items-center gap-1 bg-zinc-100/70 p-1 rounded-full text-xs border border-zinc-200/60 shadow-xs">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "all"
                    ? "bg-white text-zinc-900 font-medium shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                Notes
              </button>
              <button
                onClick={() => setActiveTab("archive")}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "archive"
                    ? "bg-white text-zinc-900 font-medium shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                Archive
              </button>
              <button
                onClick={() => setActiveTab("trash")}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "trash"
                    ? "bg-white text-zinc-900 font-medium shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                Trash
              </button>
            </nav>
          </div>

          {/* Right Column: Search, New Note, User Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder={
                  activeTab === "all"
                    ? "Search thoughts..."
                    : activeTab === "archive"
                    ? "Search archive..."
                    : "Search trash..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-36 lg:w-52 pl-8 pr-3 py-1.5 text-xs bg-white border border-zinc-200 rounded-full focus:outline-none focus:border-zinc-400 placeholder:text-zinc-400 transition-all"
              />
              <svg
                className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {activeTab !== "trash" && (
              <button
                onClick={openNewNoteModal}
                className="px-3.5 sm:px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium rounded-full transition shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              >
                + New Note
              </button>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="text-xs text-zinc-500 hover:text-zinc-900 px-3 py-1.5 rounded-full hover:bg-zinc-100 transition whitespace-nowrap shrink-0 cursor-pointer"
              >
                Sign out
              </button>
            ) : (
              <Link
                to="/login"
                className="text-xs text-zinc-600 hover:text-zinc-900 px-3 py-1.5 transition whitespace-nowrap shrink-0"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Sub-Header: Tabs & Search */}
        <div className="sm:hidden mt-3 flex flex-col gap-2.5">
          <nav className="flex items-center justify-center gap-1 bg-zinc-100/70 p-1 rounded-full text-xs border border-zinc-200/60 self-center">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 rounded-full transition cursor-pointer ${
                activeTab === "all"
                  ? "bg-white text-zinc-900 font-medium shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              Notes
            </button>
            <button
              onClick={() => setActiveTab("archive")}
              className={`px-3 py-1 rounded-full transition cursor-pointer ${
                activeTab === "archive"
                  ? "bg-white text-zinc-900 font-medium shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              Archive
            </button>
            <button
              onClick={() => setActiveTab("trash")}
              className={`px-3 py-1 rounded-full transition cursor-pointer ${
                activeTab === "trash"
                  ? "bg-white text-zinc-900 font-medium shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              Trash
            </button>
          </nav>

          <div className="relative">
            <input
              type="text"
              placeholder={
                activeTab === "all"
                  ? "Search thoughts..."
                  : activeTab === "archive"
                  ? "Search archive..."
                  : "Search trash..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-zinc-200 rounded-full focus:outline-none focus:border-zinc-400 placeholder:text-zinc-400"
            />
            <svg
              className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {error && (
          <div className="mb-6 p-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl">
            {error}
          </div>
        )}

        {loading && displayedNotes.length === 0 ? (
          <div className="py-24 text-center text-xs text-zinc-400 animate-pulse">
            Gathering thoughts...
          </div>
        ) : displayedNotes.length === 0 ? (
          <div className="py-24 sm:py-32 flex flex-col items-center justify-center text-center px-4 animate-fade-in">
            <div className="w-10 h-10 mb-4 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-base font-medium text-zinc-800">
              {activeTab === "all"
                ? "Your mind is quiet"
                : activeTab === "archive"
                ? "No archived notes"
                : "Trash is clean"}
            </h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs">
              {activeTab === "all"
                ? "Capture thoughts, ideas, or daily clarity in a clutter-free sanctuary."
                : activeTab === "archive"
                ? "Notes you save for later reference will show up here."
                : "Items moved to trash will rest here."}
            </p>
            {activeTab === "all" && (
              <button
                onClick={openNewNoteModal}
                className="mt-6 px-4 py-2 text-xs font-medium text-zinc-900 border border-zinc-200 rounded-full hover:bg-zinc-100 transition active:scale-95"
              >
                Create your first note
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-8 sm:space-y-10 animate-fade-in">
            {activeTab === "all" && pinnedNotes.length > 0 && (
              <section>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-3 sm:mb-4">
                  Pinned
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {pinnedNotes.map((note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      activeTab={activeTab}
                      onEdit={openEditModal}
                      onPin={handlePinNote}
                      onArchive={handleArchiveNote}
                      onDelete={handleDeleteNote}
                      onRestore={handleRestoreNote}
                      onDeletePerm={handleDeleteNotePerm}
                    />
                  ))}
                </div>
              </section>
            )}

            <section>
              {activeTab === "all" && pinnedNotes.length > 0 && (
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-3 sm:mb-4">
                  Others
                </h4>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {(activeTab === "all" ? regularNotes : displayedNotes).map(
                  (note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      activeTab={activeTab}
                      onEdit={openEditModal}
                      onPin={handlePinNote}
                      onArchive={handleArchiveNote}
                      onDelete={handleDeleteNote}
                      onRestore={handleRestoreNote}
                      onDeletePerm={handleDeleteNotePerm}
                    />
                  ),
                )}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Responsive Composer Modal */}
      {isComposerOpen && (
        <div className="fixed inset-0 z-50 bg-black/25 backdrop-blur-[2px] flex items-center justify-center p-3 sm:p-4 animate-backdrop">
          <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-lg p-5 sm:p-8 shadow-xl border border-zinc-100 flex flex-col gap-4 max-h-[92vh] overflow-y-auto animate-scale-up">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                {editingNoteId ? "Edit Note" : "New Note"}
              </span>
              <button
                onClick={closeComposer}
                className="text-zinc-400 hover:text-zinc-700 text-sm font-medium p-1 transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitNote} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-base sm:text-lg font-medium text-zinc-900 placeholder:text-zinc-300 focus:outline-none transition-colors"
              />
              <textarea
                placeholder="Capture your reflection..."
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full text-xs sm:text-sm text-zinc-700 placeholder:text-zinc-300 focus:outline-none resize-none leading-relaxed transition-colors"
              />
              <input
                type="text"
                placeholder="Tags (e.g. Ideas, Journal, Project)"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full text-xs text-zinc-500 placeholder:text-zinc-300 py-1.5 focus:outline-none border-t border-zinc-100 transition-colors"
              />

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={closeComposer}
                  className="px-4 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 rounded-full transition-all duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-xs font-medium bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98] text-white rounded-full transition-all duration-200 shadow-sm cursor-pointer"
                >
                  {loading ? "Saving..." : "Save Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const NoteCard = ({
  note,
  activeTab,
  onEdit,
  onPin,
  onArchive,
  onDelete,
  onRestore,
  onDeletePerm,
}) => {
  return (
    <div className="group relative bg-white border border-zinc-200/80 rounded-2xl p-4 sm:p-6 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.035)] hover:border-zinc-300/90 flex flex-col justify-between animate-fade-in">
      <div
        onClick={() => activeTab !== "trash" && onEdit(note)}
        className={activeTab !== "trash" ? "cursor-pointer" : ""}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-sm sm:text-base text-zinc-900 leading-snug tracking-tight">
            {note.title || "Untitled"}
          </h3>
          {activeTab === "all" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPin(note._id);
              }}
              title={note.pinned ? "Unpin" : "Pin"}
              className={`text-xs p-1 rounded transition-all duration-200 active:scale-95 ${
                note.pinned
                  ? "text-[#2e7d32]"
                  : "text-zinc-300 group-hover:text-zinc-500 hover:text-zinc-900"
              }`}
            >
              📌
            </button>
          )}
        </div>

        <p className="text-xs text-zinc-600 font-light leading-relaxed line-clamp-5 whitespace-pre-wrap">
          {note.content}
        </p>

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-4">
            {note.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] rounded-full bg-zinc-100 text-zinc-500 font-normal"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-zinc-100 text-[11px] text-zinc-400">
        <span>
          {note.createdAt
            ? new Date(note.createdAt).toLocaleDateString()
            : ""}
        </span>

        <div className="flex items-center gap-2">
          {activeTab === "trash" ? (
            <>
              <button
                onClick={() => onRestore(note._id)}
                className="hover:text-zinc-900 font-medium cursor-pointer"
              >
                Restore
              </button>
              <button
                onClick={() => onDeletePerm(note._id)}
                className="text-red-500 hover:text-red-700 font-medium cursor-pointer"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onArchive(note._id)}
                className="hover:text-zinc-900 font-medium cursor-pointer"
              >
                {note.archive ? "Unarchive" : "Archive"}
              </button>
              <button
                onClick={() => onDelete(note._id)}
                className="hover:text-red-600 font-medium cursor-pointer"
              >
                Trash
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
