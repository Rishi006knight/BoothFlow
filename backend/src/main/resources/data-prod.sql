-- Production seed data (PostgreSQL-compatible, no H2-specific ALTER statements)
INSERT INTO states (id, name, code, electoral_votes) VALUES
(1, 'Tamil Nadu', 'TN', 39),
(2, 'Kerala', 'KL', 20),
(3, 'Karnataka', 'KA', 28),
(4, 'Andhra Pradesh', 'AP', 25),
(5, 'Telangana', 'TS', 17);

INSERT INTO constituencies (id, constituency_code, name, district, state) VALUES
(1, 'TN-001', 'Chennai Central', 'Chennai', 'Tamil Nadu'),
(2, 'TN-002', 'Chennai South', 'Chennai', 'Tamil Nadu'),
(3, 'TN-003', 'Coimbatore North', 'Coimbatore', 'Tamil Nadu'),
(4, 'TN-004', 'Madurai East', 'Madurai', 'Tamil Nadu'),
(5, 'TN-005', 'Salem City', 'Salem', 'Tamil Nadu');

INSERT INTO polling_stations (id, station_code, name, location, capacity, constituency_id) VALUES
(1, 'PS-CHN-001', 'Government Higher Secondary School', 'T Nagar', 1200, 1),
(2, 'PS-CHN-002', 'Anna Nagar Community Hall', 'Anna Nagar', 1000, 1),
(3, 'PS-CHN-003', 'Adyar Government School', 'Adyar', 900, 2),
(4, 'PS-CHN-004', 'Besant Nagar Women College', 'Besant Nagar', 850, 2),
(5, 'PS-CBE-001', 'PSG College', 'Peelamedu', 1100, 3),
(6, 'PS-CBE-002', 'Government Arts College', 'Coimbatore', 950, 3),
(7, 'PS-MDU-001', 'Madurai Kamaraj University', 'Madurai', 1050, 4),
(8, 'PS-MDU-002', 'Thiagarajar College', 'Madurai', 900, 4),
(9, 'PS-SLM-001', 'Salem Government School', 'Salem', 1000, 5),
(10, 'PS-SLM-002', 'Sona College', 'Salem', 850, 5);

INSERT INTO parties (id, party_code, name, symbol) VALUES
(1, 'DMK', 'Dravida Munnetra Kazhagam', 'Rising Sun'),
(2, 'AIADMK', 'All India Anna Dravida Munnetra Kazhagam', 'Two Leaves'),
(3, 'BJP', 'Bharatiya Janata Party', 'Lotus'),
(4, 'INC', 'Indian National Congress', 'Hand'),
(5, 'PMK', 'Pattali Makkal Katchi', 'Mango'),
(6, 'MDMK', 'Marumalarchi Dravida Munnetra Kazhagam', 'Umbrella'),
(7, 'VCK', 'Viduthalai Chiruthaigal Katchi', 'Rising Star'),
(8, 'NTK', 'Naam Tamilar Katchi', 'Two Torch');

INSERT INTO elections (id, election_code, name, type, election_date, constituency_id) VALUES
(1, 'TN-ASM-2026-001', 'Tamil Nadu Assembly Election 2026', 'Assembly', '2026-05-06', 1),
(2, 'TN-ASM-2026-002', 'Tamil Nadu Assembly Election 2026', 'Assembly', '2026-05-06', 2),
(3, 'TN-ASM-2026-003', 'Tamil Nadu Assembly Election 2026', 'Assembly', '2026-05-06', 3),
(4, 'TN-ASM-2026-004', 'Tamil Nadu Assembly Election 2026', 'Assembly', '2026-05-06', 4),
(5, 'TN-ASM-2026-005', 'Tamil Nadu Assembly Election 2026', 'Assembly', '2026-05-06', 5);

INSERT INTO candidates (id, candidate_code, name, age, qualification, party_id, election_id) VALUES
(1, 'CAN-DMK-001', 'M.K. Stalin', 71, 'B.A.', 1, 1),
(2, 'CAN-AIADMK-001', 'Edappadi K. Palaniswami', 70, 'B.Sc.', 2, 1),
(3, 'CAN-BJP-001', 'K. Annamalai', 40, 'MBA, IIM', 3, 1),
(4, 'CAN-INC-001', 'K.S. Alagiri', 65, 'M.A.', 4, 1),
(5, 'CAN-PMK-001', 'Anbumani Ramadoss', 56, 'MBBS, MD', 5, 1),
(6, 'CAN-DMK-002', 'Udhayanidhi Stalin', 42, 'B.Com', 1, 2),
(7, 'CAN-AIADMK-002', 'O. Panneerselvam', 68, 'B.A.', 2, 2),
(8, 'CAN-BJP-002', 'Nainar Nagendran', 62, 'B.L.', 3, 2),
(9, 'CAN-DMK-003', 'K. Thangamuthu', 58, 'M.A.', 1, 3),
(10, 'CAN-AIADMK-003', 'S. P. Velumani', 59, 'B.E.', 2, 3);

INSERT INTO voters (id, voter_code, name, dob, gender, phone, address, constituency_id) VALUES
(1, 'VTR-CHN-001', 'Rajesh Kumar', '1985-03-15', 'Male', '9876543210', '45, T Nagar, Chennai', 1),
(2, 'VTR-CHN-002', 'Priya Lakshmi', '1990-07-22', 'Female', '9876543211', '12, Anna Nagar, Chennai', 1),
(3, 'VTR-CHN-003', 'Suresh Babu', '1982-11-08', 'Male', '9876543212', '78, Adyar, Chennai', 2),
(4, 'VTR-CHN-004', 'Kavitha Rajan', '1988-05-30', 'Female', '9876543213', '23, Besant Nagar, Chennai', 2),
(5, 'VTR-CBE-001', 'Mohan Das', '1980-09-12', 'Male', '9876543214', '56, Peelamedu, Coimbatore', 3),
(6, 'VTR-CBE-002', 'Latha Devi', '1992-02-18', 'Female', '9876543215', '89, Coimbatore', 3),
(7, 'VTR-MDU-001', 'Karthik Raja', '1986-08-25', 'Male', '9876543216', '34, Madurai', 4),
(8, 'VTR-MDU-002', 'Sundari Balan', '1994-12-10', 'Female', '9876543217', '67, Madurai', 4),
(9, 'VTR-SLM-001', 'Venkatesh P', '1983-04-05', 'Male', '9876543218', '91, Salem', 5),
(10, 'VTR-SLM-002', 'Meena Kumari', '1991-06-28', 'Female', '9876543219', '22, Salem', 5);

INSERT INTO votes (id, vote_number, cast_at, voter_id, candidate_id, election_id, polling_station_id) VALUES
(1, 'VOTE-2026-001', '2026-05-06 08:30:00', 1, 1, 1, 1),
(2, 'VOTE-2026-002', '2026-05-06 08:45:00', 2, 1, 1, 1),
(3, 'VOTE-2026-003', '2026-05-06 09:00:00', 3, 6, 2, 3),
(4, 'VOTE-2026-004', '2026-05-06 09:15:00', 4, 6, 2, 3),
(5, 'VOTE-2026-005', '2026-05-06 09:30:00', 5, 9, 3, 5),
(6, 'VOTE-2026-006', '2026-05-06 09:45:00', 6, 9, 3, 5),
(7, 'VOTE-2026-007', '2026-05-06 10:00:00', 7, 1, 4, 7),
(8, 'VOTE-2026-008', '2026-05-06 10:15:00', 8, 1, 4, 7),
(9, 'VOTE-2026-009', '2026-05-06 10:30:00', 9, 1, 5, 9),
(10, 'VOTE-2026-010', '2026-05-06 10:45:00', 10, 1, 5, 9);
