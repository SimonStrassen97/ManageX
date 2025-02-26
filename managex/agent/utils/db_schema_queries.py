import psycopg2 as pg

# Define the SQL commands
fetch_tables = """
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND (table_name LIKE '%api%' OR table_name = 'auth_user');
"""

fetch_columns = """
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = %s;
"""

fetch_primary_keys = """
SELECT kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name = %s
AND tc.constraint_type = 'PRIMARY KEY';
"""

fetch_foreign_keys = """
SELECT
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM
    information_schema.key_column_usage AS kcu
JOIN
    information_schema.constraint_column_usage AS ccu
ON
    kcu.constraint_name = ccu.constraint_name
WHERE
    kcu.table_name = %s
    AND kcu.constraint_schema = 'public';
"""


