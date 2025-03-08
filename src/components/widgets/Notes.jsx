import { useState, useEffect } from "react";
import "../../styles/widgets/Notes.css";

function Notes() {
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('quickNotes');
        return savedNotes ? JSON.parse(savedNotes) : [];
    });
    
    const [newNote, setNewNote] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    
    // Salvar notas no localStorage quando houver mudanças
    useEffect(() => {
        localStorage.setItem('quickNotes', JSON.stringify(notes));
    }, [notes]);
    
    const addNote = (e) => {
        e.preventDefault();
        if (newNote.trim()) {
            const note = {
                id: Date.now(),
                text: newNote,
                date: new Date().toLocaleDateString()
            };
            
            setNotes([note, ...notes]);
            setNewNote("");
            setIsAdding(false);
        }
    };
    
    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };
    
    const toggleAddNote = () => {
        setIsAdding(!isAdding);
        if (!isAdding) {
            setTimeout(() => document.getElementById("new-note-input")?.focus(), 100);
        }
    };
    
    return (
        <div className="notes-widget">
            <div className="widget-header">
                <div className="widget-title">
                    <span className="material-symbols-outlined">note</span>
                    Notas Rápidas
                </div>
                <span 
                    className="material-symbols-outlined add-note-icon" 
                    onClick={toggleAddNote}
                    title={isAdding ? "Cancelar" : "Adicionar nota"}
                >
                    {isAdding ? "close" : "add"}
                </span>
            </div>
            
            <div className="widget-content">
                {isAdding && (
                    <form className="add-note-form" onSubmit={addNote}>
                        <textarea
                            id="new-note-input"
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Digite sua nota aqui..."
                            rows={3}
                        />
                        <div className="note-form-actions">
                            <button 
                                type="button" 
                                className="cancel-note-btn"
                                onClick={() => {
                                    setIsAdding(false);
                                    setNewNote("");
                                }}
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                className="save-note-btn"
                                disabled={!newNote.trim()}
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                )}
                
                <div className="notes-list">
                    {notes.length === 0 ? (
                        <div className="no-notes-message">
                            Nenhuma nota adicionada. Clique no ícone + para adicionar.
                        </div>
                    ) : (
                        notes.map(note => (
                            <div className="note-item" key={note.id}>
                                <div className="note-content">
                                    <p>{note.text}</p>
                                    <small>{note.date}</small>
                                </div>
                                <button 
                                    className="delete-note-btn"
                                    onClick={() => deleteNote(note.id)}
                                    title="Excluir nota"
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Notes; 