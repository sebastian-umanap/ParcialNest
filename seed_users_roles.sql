-- seed_users_roles.sql
-- Seed base roles and one admin user using bcrypt (pgcrypto).

-- Ensure extension for bcrypt and UUIDs
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1) Base roles
INSERT INTO roles (role_name, description) VALUES
  ('admin','Administrador del sistema'),
  ('user','Usuario estándar')
ON CONFLICT (role_name) DO NOTHING;

-- 2) Admin user (password: Secreta123)
INSERT INTO users (email, password, name, phone, is_active)
SELECT
  'admin@demo.com',
  crypt('Secreta123', gen_salt('bf', 10)), -- bcrypt with cost=10
  'Admin Demo',
  '3001112233',
  TRUE
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@demo.com');

-- 3) Assign ADMIN role to admin user
INSERT INTO users_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN roles r ON r.role_name = 'admin'
WHERE u.email = 'admin@demo.com'
ON CONFLICT DO NOTHING;
