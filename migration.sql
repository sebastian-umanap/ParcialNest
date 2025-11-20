--
-- PostgreSQL database dump
--

\restrict PYSsKfSlnc5uyBxM8B8PWggc8hM82S3udgcsYb1JMUbgpZ5GCbLHBwMp5IXYxgO

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2025-11-20 13:03:57

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
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 19666)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    role_name character varying(64) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 19677)
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
-- TOC entry 222 (class 1259 OID 19696)
-- Name: users_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_roles (
    user_id uuid NOT NULL,
    role_id uuid NOT NULL
);


ALTER TABLE public.users_roles OWNER TO postgres;

--
-- TOC entry 5041 (class 0 OID 19666)
-- Dependencies: 220
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, role_name, description) FROM stdin;
0bf5153a-45a3-4c45-9b5b-54cee297a367	admin	\N
f8c4a9cd-04ee-4cb7-a022-2c0e13efdd0e	user	\N
f1f813ec-5d04-4ff8-8d0a-c885d6812d68	doctor	Medico
bfd1a9b6-241f-4e25-aebc-0858aa8e4378	{{role_name_doctor}}	dup
\.


--
-- TOC entry 5042 (class 0 OID 19677)
-- Dependencies: 221
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, name, phone, is_active, created_at) FROM stdin;
f6cf76dd-d32a-4822-9c4f-387e3c7de0a0	admin@demo.com	$2b$10$rU1/8dP88UCgTSbRWjbYAepKXKAWSpJGuPmRSY6/m.hLpZqK3JZHy	Admin Demo	\N	t	2025-11-19 23:30:45.367335-05
1559127e-ef32-4e6d-a1e3-2c695feb5597	user@demo.com	$2b$10$JeKa1qanXRBYhMlzVTWzNuSmkFdq3ZN/mu0p41mynS8rjTUYkpW9e	User Demo	3002223344	t	2025-11-20 00:10:26.825105-05
\.


--
-- TOC entry 5043 (class 0 OID 19696)
-- Dependencies: 222
-- Data for Name: users_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_roles (user_id, role_id) FROM stdin;
f6cf76dd-d32a-4822-9c4f-387e3c7de0a0	0bf5153a-45a3-4c45-9b5b-54cee297a367
1559127e-ef32-4e6d-a1e3-2c695feb5597	0bf5153a-45a3-4c45-9b5b-54cee297a367
1559127e-ef32-4e6d-a1e3-2c695feb5597	bfd1a9b6-241f-4e25-aebc-0858aa8e4378
\.


--
-- TOC entry 4884 (class 2606 OID 19692)
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- TOC entry 4879 (class 2606 OID 19673)
-- Name: roles PK_c1433d71a4838793a49dcad46ab; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);


--
-- TOC entry 4891 (class 2606 OID 19702)
-- Name: users_roles PK_c525e9373d63035b9919e578a9c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY (user_id, role_id);


--
-- TOC entry 4886 (class 2606 OID 19694)
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- TOC entry 4881 (class 2606 OID 19675)
-- Name: roles UQ_ac35f51a0f17e3e1fe121126039; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "UQ_ac35f51a0f17e3e1fe121126039" UNIQUE (role_name);


--
-- TOC entry 4888 (class 1259 OID 19704)
-- Name: IDX_1cf664021f00b9cc1ff95e17de; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_1cf664021f00b9cc1ff95e17de" ON public.users_roles USING btree (role_id);


--
-- TOC entry 4889 (class 1259 OID 19703)
-- Name: IDX_e4435209df12bc1f001e536017; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON public.users_roles USING btree (user_id);


--
-- TOC entry 4882 (class 1259 OID 19676)
-- Name: UQ_roles_role_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "UQ_roles_role_name" ON public.roles USING btree (role_name);


--
-- TOC entry 4887 (class 1259 OID 19695)
-- Name: UQ_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "UQ_users_email" ON public.users USING btree (email);


--
-- TOC entry 4892 (class 2606 OID 19710)
-- Name: users_roles FK_1cf664021f00b9cc1ff95e17de4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4" FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- TOC entry 4893 (class 2606 OID 19705)
-- Name: users_roles FK_e4435209df12bc1f001e5360174; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2025-11-20 13:03:57

--
-- PostgreSQL database dump complete
--

\unrestrict PYSsKfSlnc5uyBxM8B8PWggc8hM82S3udgcsYb1JMUbgpZ5GCbLHBwMp5IXYxgO

