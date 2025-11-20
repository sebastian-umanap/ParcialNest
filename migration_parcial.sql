--
-- PostgreSQL database dump
--

\restrict 5PgYdJ4LH41Sm6ckvE5M5Npe87Hzv0amS1PC6th39SO5s68hDBcjPCV21URvMo8

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2025-11-20 18:18:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 16914)
-- Name: appointments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    id_user uuid NOT NULL,
    id_doctor uuid NOT NULL,
    datetime timestamp with time zone NOT NULL,
    status character varying(20) DEFAULT 'pending'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.appointments OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16852)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    role_name character varying(64) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16864)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(180) NOT NULL,
    password character varying NOT NULL,
    name character varying(180) NOT NULL,
    phone character varying(50),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16884)
-- Name: users_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_roles (
    user_id uuid NOT NULL,
    role_id uuid NOT NULL
);


ALTER TABLE public.users_roles OWNER TO postgres;

--
-- TOC entry 5053 (class 0 OID 16914)
-- Dependencies: 223
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointments (id, id_user, id_doctor, datetime, status, created_at) FROM stdin;
\.


--
-- TOC entry 5050 (class 0 OID 16852)
-- Dependencies: 220
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, role_name, description) FROM stdin;
50a76f51-8694-4a8c-92c5-c19df9c825a7	admin	\N
c079c4d6-9b86-48d3-a169-e7b1fbdf66af	user	\N
\.


--
-- TOC entry 5051 (class 0 OID 16864)
-- Dependencies: 221
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, name, phone, is_active, created_at) FROM stdin;
ee99bca4-eccd-4b38-97af-9b46ce71c815	admin@demo.com	$2b$10$DZi4HHmPilyXA5bcJRIed.LvI.Y9ybEzTSF33W7rLBCXxLo8foTQG	Admin Demo	3001112233	t	2025-11-18 18:20:54.618777-05
\.


--
-- TOC entry 5052 (class 0 OID 16884)
-- Dependencies: 222
-- Data for Name: users_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_roles (user_id, role_id) FROM stdin;
ee99bca4-eccd-4b38-97af-9b46ce71c815	50a76f51-8694-4a8c-92c5-c19df9c825a7
\.


--
-- TOC entry 4900 (class 2606 OID 16927)
-- Name: appointments PK_4a437a9a27e948726b8bb3e36ad; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY (id);


--
-- TOC entry 4891 (class 2606 OID 16882)
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- TOC entry 4886 (class 2606 OID 16861)
-- Name: roles PK_c1433d71a4838793a49dcad46ab; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);


--
-- TOC entry 4898 (class 2606 OID 16890)
-- Name: users_roles PK_c525e9373d63035b9919e578a9c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY (user_id, role_id);


--
-- TOC entry 4893 (class 2606 OID 16913)
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- TOC entry 4888 (class 2606 OID 16905)
-- Name: roles UQ_ac35f51a0f17e3e1fe121126039; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "UQ_ac35f51a0f17e3e1fe121126039" UNIQUE (role_name);


--
-- TOC entry 4895 (class 1259 OID 16892)
-- Name: IDX_1cf664021f00b9cc1ff95e17de; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_1cf664021f00b9cc1ff95e17de" ON public.users_roles USING btree (role_id);


--
-- TOC entry 4896 (class 1259 OID 16891)
-- Name: IDX_e4435209df12bc1f001e536017; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON public.users_roles USING btree (user_id);


--
-- TOC entry 4889 (class 1259 OID 16906)
-- Name: UQ_roles_role_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "UQ_roles_role_name" ON public.roles USING btree (role_name);


--
-- TOC entry 4894 (class 1259 OID 16883)
-- Name: UQ_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "UQ_users_email" ON public.users USING btree (email);


--
-- TOC entry 4901 (class 2606 OID 16898)
-- Name: users_roles FK_1cf664021f00b9cc1ff95e17de4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4" FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- TOC entry 4902 (class 2606 OID 16893)
-- Name: users_roles FK_e4435209df12bc1f001e5360174; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2025-11-20 18:18:48

--
-- PostgreSQL database dump complete
--

\unrestrict 5PgYdJ4LH41Sm6ckvE5M5Npe87Hzv0amS1PC6th39SO5s68hDBcjPCV21URvMo8

