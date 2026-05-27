from database import get_connection

# =========================
# ACCOUNTS
# =========================

def get_accounts():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT *
        FROM accounts
    """)
    rows = cursor.fetchall()

    conn.close()

    return [dict(row) for row in rows]

def create_account(name, type, balance):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO accounts (
            name,
            type,
            balance
        )
        VALUES (?, ?, ?)
    """, (name, type, balance))

    conn.commit()
    conn.close()

# =========================
# TRANSACTIONS
# =========================

def get_transactions():

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT *
        FROM transactions
        ORDER BY created_at DESC
    """)

    rows = cursor.fetchall()
    conn.close()

    return [dict(row) for row in rows]


def create_transaction(
    account_id,
    description,
    category,
    amount
):

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO transactions (
            account_id,
            description,
            category,
            amount
        )
        VALUES (?, ?, ?, ?)
    """, (
        account_id,
        description,
        category,
        amount
    ))

    conn.commit()
    conn.close()

# =========================
# GOALS
# =========================

def get_goals():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT *
        FROM goals
    """)

    rows = cursor.fetchall()
    conn.close()

    return [dict(row) for row in rows]

def create_goal(
    title,
    current,
    target
):

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO goals (
            title,
            current,
            target
        )
        VALUES (?, ?, ?)
    """, (
        title,
        current,
        target
    ))

    conn.commit()
    conn.close()