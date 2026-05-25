import uuid

from database import get_connection


def create_session():
    session_id = str(uuid.uuid4())
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO sessions (id, title) VALUES (?, ?)",
        (session_id, "New Chat")
    )

    cursor.execute(
        "INSERT INTO messages (session_id, role, content) VALUES (?, ?, ?)",
        (session_id, "system", "You're a helpful assistant.")
    )

    conn.commit()
    conn.close()

    return session_id


def list_sessions():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT id, title FROM sessions ORDER BY created_at DESC"
    )

    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "session_id": row["id"],
            "title": row["title"]
        }
        for row in rows
    ]


def save_message(session_id, role, content):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO messages (session_id, role, content) VALUES (?, ?, ?)",
        (session_id, role, content)
    )

    conn.commit()
    conn.close()


def get_session(session_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT id, title FROM sessions WHERE id = ?",
        (session_id,)
    )
    session_row = cursor.fetchone()

    #Handle case where session_id does not exist
    if not session_row:
        conn.close()
        return None

    cursor.execute(
        "SELECT role, content FROM messages WHERE session_id = ? ORDER BY created_at ASC",
        (session_id,)
    )
    message_rows = cursor.fetchall()
    conn.close()

    return {
        "session_id": session_row["id"],
        "title": session_row["title"],
        "messages": [
            {
                "role": message["role"],
                "content": message["content"]
            }
            for message in message_rows
        ]
    }


def delete_session(session_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM messages WHERE session_id = ?",
        (session_id,)
    )
    cursor.execute(
        "DELETE FROM sessions WHERE id = ?",
        (session_id,)
    )

    success = cursor.rowcount > 0
    conn.commit()
    conn.close()

    return success


def update_session_title(session_id, title):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE sessions SET title = ? WHERE id = ?",
        (title, session_id)
    )

    success = cursor.rowcount > 0
    conn.commit()
    conn.close()

    return success
