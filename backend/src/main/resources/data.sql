-- H2 Development Seed Data
-- Comprehensive Indian Election Management System data across 5 states

-- ============================================================
-- STATES (5 major South Indian states)
-- ============================================================
INSERT INTO states (id, name, code, electoral_votes) VALUES
(1, 'Tamil Nadu', 'TN', 39),
(2, 'Kerala', 'KL', 20),
(3, 'Karnataka', 'KA', 28),
(4, 'Andhra Pradesh', 'AP', 25),
(5, 'Telangana', 'TS', 17);

-- ============================================================
-- CONSTITUENCIES (5 per state = 25 total)
-- ============================================================
-- Tamil Nadu (5)
INSERT INTO constituencies (id, constituency_code, name, district, state) VALUES
(1, 'TN-001', 'Chennai Central', 'Chennai', 'Tamil Nadu'),
(2, 'TN-002', 'Chennai South', 'Chennai', 'Tamil Nadu'),
(3, 'TN-003', 'Coimbatore North', 'Coimbatore', 'Tamil Nadu'),
(4, 'TN-004', 'Madurai East', 'Madurai', 'Tamil Nadu'),
(5, 'TN-005', 'Salem City', 'Salem', 'Tamil Nadu'),
-- Kerala (5)
(6, 'KL-001', 'Thiruvananthapuram Central', 'Thiruvananthapuram', 'Kerala'),
(7, 'KL-002', 'Ernakulam', 'Ernakulam', 'Kerala'),
(8, 'KL-003', 'Kozhikode North', 'Kozhikode', 'Kerala'),
(9, 'KL-004', 'Thrissur', 'Thrissur', 'Kerala'),
(10, 'KL-005', 'Kollam', 'Kollam', 'Kerala'),
-- Karnataka (5)
(11, 'KA-001', 'Bangalore Central', 'Bangalore Urban', 'Karnataka'),
(12, 'KA-002', 'Bangalore South', 'Bangalore Urban', 'Karnataka'),
(13, 'KA-003', 'Mysore', 'Mysore', 'Karnataka'),
(14, 'KA-004', 'Hubli-Dharwad', 'Dharwad', 'Karnataka'),
(15, 'KA-005', 'Mangalore', 'Dakshina Kannada', 'Karnataka'),
-- Andhra Pradesh (5)
(16, 'AP-001', 'Visakhapatnam East', 'Visakhapatnam', 'Andhra Pradesh'),
(17, 'AP-002', 'Vijayawada Central', 'Krishna', 'Andhra Pradesh'),
(18, 'AP-003', 'Guntur West', 'Guntur', 'Andhra Pradesh'),
(19, 'AP-004', 'Tirupati', 'Chittoor', 'Andhra Pradesh'),
(20, 'AP-005', 'Rajahmundry', 'East Godavari', 'Andhra Pradesh'),
-- Telangana (5)
(21, 'TS-001', 'Hyderabad Central', 'Hyderabad', 'Telangana'),
(22, 'TS-002', 'Secunderabad', 'Hyderabad', 'Telangana'),
(23, 'TS-003', 'Warangal East', 'Warangal Urban', 'Telangana'),
(24, 'TS-004', 'Karimnagar', 'Karimnagar', 'Telangana'),
(25, 'TS-005', 'Nizamabad', 'Nizamabad', 'Telangana');

-- ============================================================
-- POLLING STATIONS (2 per constituency = 50 total)
-- ============================================================
INSERT INTO polling_stations (id, station_code, name, location, capacity, constituency_id) VALUES
-- Tamil Nadu
(1, 'PS-TN-001-A', 'Government Higher Secondary School', 'T Nagar, Chennai', 1200, 1),
(2, 'PS-TN-001-B', 'Anna Nagar Community Hall', 'Anna Nagar, Chennai', 1000, 1),
(3, 'PS-TN-002-A', 'Adyar Government School', 'Adyar, Chennai', 900, 2),
(4, 'PS-TN-002-B', 'Besant Nagar Women College', 'Besant Nagar, Chennai', 850, 2),
(5, 'PS-TN-003-A', 'PSG College of Arts', 'Peelamedu, Coimbatore', 1100, 3),
(6, 'PS-TN-003-B', 'Government Arts College', 'Coimbatore City', 950, 3),
(7, 'PS-TN-004-A', 'Madurai Kamaraj University', 'Palkalai Nagar, Madurai', 1050, 4),
(8, 'PS-TN-004-B', 'Thiagarajar College', 'Madurai Main', 900, 4),
(9, 'PS-TN-005-A', 'Salem Government School', 'Salem Town', 1000, 5),
(10, 'PS-TN-005-B', 'Sona College Hall', 'Salem Junction', 850, 5),
-- Kerala
(11, 'PS-KL-001-A', 'Government VHSS Thiruvananthapuram', 'Thycaud, TVM', 1100, 6),
(12, 'PS-KL-001-B', 'SMV School Hall', 'Thycaud, TVM', 950, 6),
(13, 'PS-KL-002-A', 'Maharajas College Ernakulam', 'Ernakulam South', 1050, 7),
(14, 'PS-KL-002-B', 'St. Alberts School', 'Ernakulam North', 900, 7),
(15, 'PS-KL-003-A', 'Government Victoria College', 'Kozhikode Beach', 1000, 8),
(16, 'PS-KL-003-B', 'Devagiri College', 'Kozhikode East', 850, 8),
(17, 'PS-KL-004-A', 'Kerala Varma College', 'Thrissur Swaraj Round', 1100, 9),
(18, 'PS-KL-004-B', 'St. Thomas College', 'Thrissur Main', 950, 9),
(19, 'PS-KL-005-A', 'Government Boys School Kollam', 'Kollam Beach', 1000, 10),
(20, 'PS-KL-005-B', 'TKM College Hall', 'Kollam Karikode', 850, 10),
-- Karnataka
(21, 'PS-KA-001-A', 'Mount Carmel College', 'Palace Road, Bangalore', 1200, 11),
(22, 'PS-KA-001-B', 'Central College Bangalore', 'Bangalore Main', 1050, 11),
(23, 'PS-KA-002-A', 'National College Basavanagudi', 'Bangalore South', 1000, 12),
(24, 'PS-KA-002-B', 'Christ University Hall', 'Hosur Road, Bangalore', 950, 12),
(25, 'PS-KA-003-A', 'University of Mysore', 'Mysore Campus', 1100, 13),
(26, 'PS-KA-003-B', 'Maharani College Mysore', 'Mysore Palace Road', 900, 13),
(27, 'PS-KA-004-A', 'Karnatak University Campus', 'Dharwad Main', 1000, 14),
(28, 'PS-KA-004-B', 'SDM College Hubli', 'Hubli Station Road', 850, 14),
(29, 'PS-KA-005-A', 'Government College Mangalore', 'Mangalore Hampankatta', 1050, 15),
(30, 'PS-KA-005-B', 'St. Aloysius College', 'Mangalore Light House Hill', 900, 15),
-- Andhra Pradesh
(31, 'PS-AP-001-A', 'Andhra University Engineering College', 'Visakhapatnam Beach Road', 1100, 16),
(32, 'PS-AP-001-B', 'Government School Seethammadhara', 'Vizag City', 950, 16),
(33, 'PS-AP-002-A', 'SRR Government College', 'Vijayawada Main', 1050, 17),
(34, 'PS-AP-002-B', 'Siddhartha College', 'Vijayawada Benz Circle', 900, 17),
(35, 'PS-AP-003-A', 'Government College for Men', 'Guntur City', 1000, 18),
(36, 'PS-AP-003-B', 'JKC College', 'Guntur Main Road', 850, 18),
(37, 'PS-AP-004-A', 'Sri Venkateswara University', 'Tirupati Alipiri', 1100, 19),
(38, 'PS-AP-004-B', 'SPMVV Campus', 'Tirupati Town', 950, 19),
(39, 'PS-AP-005-A', 'Government Arts College', 'Rajahmundry Main', 1000, 20),
(40, 'PS-AP-005-B', 'Godavari Institute', 'Rajahmundry Pushkar Ghat', 850, 20),
-- Telangana
(41, 'PS-TS-001-A', 'Nizam College', 'Basheer Bagh, Hyderabad', 1200, 21),
(42, 'PS-TS-001-B', 'Osmania University Campus', 'Tarnaka, Hyderabad', 1050, 21),
(43, 'PS-TS-002-A', 'St. Francis College', 'Secunderabad Cantonment', 1000, 22),
(44, 'PS-TS-002-B', 'Government School Bolarum', 'Secunderabad East', 850, 22),
(45, 'PS-TS-003-A', 'Kakatiya University', 'Warangal Hanamkonda', 1100, 23),
(46, 'PS-TS-003-B', 'NIT Warangal Campus', 'Warangal Main', 950, 23),
(47, 'PS-TS-004-A', 'Government Degree College', 'Karimnagar Town', 1000, 24),
(48, 'PS-TS-004-B', 'SRR Degree College', 'Karimnagar Main Road', 850, 24),
(49, 'PS-TS-005-A', 'Government College Nizamabad', 'Nizamabad City', 1050, 25),
(50, 'PS-TS-005-B', 'Nagarjuna Degree College', 'Nizamabad Bus Stand', 900, 25);

-- ============================================================
-- PARTIES (12 major parties across states)
-- ============================================================
INSERT INTO parties (id, party_code, name, symbol) VALUES
(1, 'DMK', 'Dravida Munnetra Kazhagam', 'Rising Sun'),
(2, 'AIADMK', 'All India Anna Dravida Munnetra Kazhagam', 'Two Leaves'),
(3, 'BJP', 'Bharatiya Janata Party', 'Lotus'),
(4, 'INC', 'Indian National Congress', 'Hand'),
(5, 'PMK', 'Pattali Makkal Katchi', 'Mango'),
(6, 'CPIM', 'Communist Party of India (Marxist)', 'Hammer and Sickle'),
(7, 'CPI', 'Communist Party of India', 'Ears of Corn and Sickle'),
(8, 'BJD', 'Biju Janata Dal', 'Conch'),
(9, 'TDP', 'Telugu Desam Party', 'Bicycle'),
(10, 'YSRCP', 'Yuvajana Sramika Rythu Congress Party', 'Fan'),
(11, 'TRS', 'Telangana Rashtra Samithi', 'Car'),
(12, 'JD-S', 'Janata Dal (Secular)', 'Female Farmer');

-- ============================================================
-- ELECTIONS (1 per constituency = 25 Assembly elections)
-- ============================================================
INSERT INTO elections (id, election_code, name, type, election_date, constituency_id) VALUES
-- Tamil Nadu Assembly Elections
(1, 'TN-ASM-2026-001', 'Tamil Nadu Assembly Election 2026', 'Assembly', '2026-05-06', 1),
(2, 'TN-ASM-2026-002', 'Tamil Nadu Assembly Election 2026', 'Assembly', '2026-05-06', 2),
(3, 'TN-ASM-2026-003', 'Tamil Nadu Assembly Election 2026', 'Assembly', '2026-05-06', 3),
(4, 'TN-ASM-2026-004', 'Tamil Nadu Assembly Election 2026', 'Assembly', '2026-05-06', 4),
(5, 'TN-ASM-2026-005', 'Tamil Nadu Assembly Election 2026', 'Assembly', '2026-05-06', 5),
-- Kerala Assembly Elections
(6, 'KL-ASM-2026-001', 'Kerala Assembly Election 2026', 'Assembly', '2026-04-20', 6),
(7, 'KL-ASM-2026-002', 'Kerala Assembly Election 2026', 'Assembly', '2026-04-20', 7),
(8, 'KL-ASM-2026-003', 'Kerala Assembly Election 2026', 'Assembly', '2026-04-20', 8),
(9, 'KL-ASM-2026-004', 'Kerala Assembly Election 2026', 'Assembly', '2026-04-20', 9),
(10, 'KL-ASM-2026-005', 'Kerala Assembly Election 2026', 'Assembly', '2026-04-20', 10),
-- Karnataka Assembly Elections
(11, 'KA-ASM-2026-001', 'Karnataka Assembly Election 2026', 'Assembly', '2026-03-15', 11),
(12, 'KA-ASM-2026-002', 'Karnataka Assembly Election 2026', 'Assembly', '2026-03-15', 12),
(13, 'KA-ASM-2026-003', 'Karnataka Assembly Election 2026', 'Assembly', '2026-03-15', 13),
(14, 'KA-ASM-2026-004', 'Karnataka Assembly Election 2026', 'Assembly', '2026-03-15', 14),
(15, 'KA-ASM-2026-005', 'Karnataka Assembly Election 2026', 'Assembly', '2026-03-15', 15),
-- Andhra Pradesh Assembly Elections
(16, 'AP-ASM-2026-001', 'Andhra Pradesh Assembly Election 2026', 'Assembly', '2026-06-01', 16),
(17, 'AP-ASM-2026-002', 'Andhra Pradesh Assembly Election 2026', 'Assembly', '2026-06-01', 17),
(18, 'AP-ASM-2026-003', 'Andhra Pradesh Assembly Election 2026', 'Assembly', '2026-06-01', 18),
(19, 'AP-ASM-2026-004', 'Andhra Pradesh Assembly Election 2026', 'Assembly', '2026-06-01', 19),
(20, 'AP-ASM-2026-005', 'Andhra Pradesh Assembly Election 2026', 'Assembly', '2026-06-01', 20),
-- Telangana Assembly Elections
(21, 'TS-ASM-2026-001', 'Telangana Assembly Election 2026', 'Assembly', '2026-02-10', 21),
(22, 'TS-ASM-2026-002', 'Telangana Assembly Election 2026', 'Assembly', '2026-02-10', 22),
(23, 'TS-ASM-2026-003', 'Telangana Assembly Election 2026', 'Assembly', '2026-02-10', 23),
(24, 'TS-ASM-2026-004', 'Telangana Assembly Election 2026', 'Assembly', '2026-02-10', 24),
(25, 'TS-ASM-2026-005', 'Telangana Assembly Election 2026', 'Assembly', '2026-02-10', 25);

-- ============================================================
-- CANDIDATES (4 per election = 100 total)
-- ============================================================
INSERT INTO candidates (id, candidate_code, name, age, qualification, party_id, election_id) VALUES
-- Chennai Central (Election 1)
(1, 'CAN-DMK-001', 'M.K. Stalin', 71, 'B.A.', 1, 1),
(2, 'CAN-AIADMK-001', 'Edappadi K. Palaniswami', 70, 'B.Sc.', 2, 1),
(3, 'CAN-BJP-001', 'K. Annamalai', 40, 'MBA, IIM', 3, 1),
(4, 'CAN-INC-001', 'K.S. Alagiri', 65, 'M.A.', 4, 1),
-- Chennai South (Election 2)
(5, 'CAN-DMK-002', 'Udhayanidhi Stalin', 42, 'B.Com', 1, 2),
(6, 'CAN-AIADMK-002', 'O. Panneerselvam', 68, 'B.A.', 2, 2),
(7, 'CAN-BJP-002', 'Nainar Nagendran', 62, 'B.L.', 3, 2),
(8, 'CAN-PMK-001', 'Anbumani Ramadoss', 56, 'MBBS, MD', 5, 2),
-- Coimbatore North (Election 3)
(9, 'CAN-DMK-003', 'K. Thangamuthu', 58, 'M.A.', 1, 3),
(10, 'CAN-AIADMK-003', 'S. P. Velumani', 59, 'B.E.', 2, 3),
(11, 'CAN-BJP-003', 'Vanathi Srinivasan', 48, 'B.L.', 3, 3),
(12, 'CAN-INC-003', 'V. Satheesan', 52, 'M.Com', 4, 3),
-- Madurai East (Election 4)
(13, 'CAN-DMK-004', 'P. Moorthy', 55, 'B.A.', 1, 4),
(14, 'CAN-AIADMK-004', 'R. B. Udhayakumar', 60, 'B.Sc.', 2, 4),
(15, 'CAN-BJP-004', 'M. Subramanian', 45, 'MBA', 3, 4),
(16, 'CAN-INC-004', 'B. S. Thindu', 50, 'M.A.', 4, 4),
-- Salem City (Election 5)
(17, 'CAN-DMK-005', 'G. V. Prakash', 49, 'B.Com', 1, 5),
(18, 'CAN-AIADMK-005', 'K. P. Munusamy', 64, 'B.A.', 2, 5),
(19, 'CAN-BJP-005', 'D. K. Suresh', 43, 'B.E.', 3, 5),
(20, 'CAN-PMK-002', 'A. Anbalagan', 52, 'M.Sc.', 5, 5),
-- Thiruvananthapuram Central (Election 6)
(21, 'CAN-CPIM-001', 'V. Sivankutty', 52, 'M.A.', 6, 6),
(22, 'CAN-INC-005', 'Shashi Tharoor', 68, 'Ph.D, D.Litt', 4, 6),
(23, 'CAN-BJP-006', 'C. Sivaramakrishnan', 55, 'M.Com', 3, 6),
(24, 'CAN-CPI-001', 'P. Rajeev', 48, 'B.A.', 7, 6),
-- Ernakulam (Election 7)
(25, 'CAN-CPIM-002', 'M. Swaraj', 42, 'M.A.', 6, 7),
(26, 'CAN-INC-006', 'Hibi Eden', 38, 'MBA', 4, 7),
(27, 'CAN-BJP-007', 'K. J. Alphonse', 58, 'M.A.', 3, 7),
(28, 'CAN-CPI-002', 'P. Raju', 50, 'B.Com', 7, 7),
-- Kozhikode North (Election 8)
(29, 'CAN-CPIM-003', 'A. Pradeepkumar', 55, 'M.A.', 6, 8),
(30, 'CAN-INC-007', 'M. K. Raghavan', 60, 'B.Com', 4, 8),
(31, 'CAN-BJP-008', 'M. Raveendran', 48, 'B.Sc.', 3, 8),
(32, 'CAN-CPI-003', 'K. P. Ismail', 52, 'B.A.', 7, 8),
-- Thrissur (Election 9)
(33, 'CAN-CPIM-004', 'K. Radhakrishnan', 56, 'M.A.', 6, 9),
(34, 'CAN-INC-008', 'T. J. Saneesh', 44, 'MBA', 4, 9),
(35, 'CAN-BJP-009', 'S. Sunilkumar', 50, 'B.L.', 3, 9),
(36, 'CAN-CPI-004', 'K. Chandran', 48, 'M.Com', 7, 9),
-- Kollam (Election 10)
(37, 'CAN-CPIM-005', 'K. Raju', 60, 'M.A.', 6, 10),
(38, 'CAN-INC-009', 'P. K. Kunhalikutty', 52, 'B.Com', 4, 10),
(39, 'CAN-BJP-010', 'N. Suresh', 46, 'B.Sc.', 3, 10),
(40, 'CAN-CPI-005', 'M. A. Baby', 55, 'M.A.', 7, 10),
-- Bangalore Central (Election 11)
(41, 'CAN-INC-010', 'D. K. Shivakumar', 62, 'B.Com', 4, 11),
(42, 'CAN-BJP-011', 'R. Ashoka', 58, 'B.Sc.', 3, 11),
(43, 'CAN-JDS-001', 'H. D. Kumaraswamy', 65, 'B.A.', 12, 11),
(44, 'CAN-CPIM-006', 'S. Y. Gurushant', 50, 'M.A.', 6, 11),
-- Bangalore South (Election 12)
(45, 'CAN-INC-011', 'Rizwan Arshad', 45, 'MBA', 4, 12),
(46, 'CAN-BJP-012', 'Tejasvi Surya', 34, 'B.L.', 3, 12),
(47, 'CAN-JDS-002', 'H. D. Revanna', 62, 'B.A.', 12, 12),
(48, 'CAN-CPIM-007', 'G. N. Nagaraj', 52, 'M.Com', 6, 12),
-- Mysore (Election 13)
(49, 'CAN-INC-012', 'Yatindra Siddaramaiah', 42, 'MBBS', 4, 13),
(50, 'CAN-BJP-013', 'S. A. Ramdas', 55, 'B.A.M.S', 3, 13),
(51, 'CAN-JDS-003', 'Sa. Ra. Mahesh', 48, 'B.Com', 12, 13),
(52, 'CAN-CPIM-008', 'K. S. Puttannaiah', 56, 'M.A.', 6, 13),
-- Hubli-Dharwad (Election 14)
(53, 'CAN-INC-013', 'A. B. Patil', 50, 'M.A.', 4, 14),
(54, 'CAN-BJP-014', 'Prahlad Joshi', 58, 'B.A.', 3, 14),
(55, 'CAN-JDS-004', 'Basavaraj Horatti', 64, 'B.Ed', 12, 14),
(56, 'CAN-CPIM-009', 'S. S. Patil', 48, 'M.Com', 6, 14),
-- Mangalore (Election 15)
(57, 'CAN-INC-014', 'U. T. Khader', 50, 'B.A.', 4, 15),
(58, 'CAN-BJP-015', 'Nalin Kumar Kateel', 55, 'B.Com', 3, 15),
(59, 'CAN-JDS-005', 'K. Amarnath Shetty', 52, 'B.A.', 12, 15),
(60, 'CAN-CPIM-010', 'Vasudev Achari', 46, 'M.A.', 6, 15),
-- Visakhapatnam East (Election 16)
(61, 'CAN-YSRCP-001', 'Y. S. Jagan Mohan Reddy', 52, 'M.A.', 10, 16),
(62, 'CAN-TDP-001', 'N. Chandrababu Naidu', 74, 'M.A.', 9, 16),
(63, 'CAN-BJP-016', 'P. V. N. Madhav', 48, 'B.Com', 3, 16),
(64, 'CAN-INC-015', 'B. Satyanarayana', 55, 'M.A.', 4, 16),
-- Vijayawada Central (Election 17)
(65, 'CAN-YSRCP-002', 'Vellampalli Srinivas', 50, 'B.Com', 10, 17),
(66, 'CAN-TDP-002', 'G. Veerabhadra Swamy', 58, 'B.A.', 9, 17),
(67, 'CAN-BJP-017', 'S. V. Satyakumar', 44, 'MBA', 3, 17),
(68, 'CAN-INC-016', 'D. Manikyala Rao', 52, 'M.A.', 4, 17),
-- Guntur West (Election 18)
(69, 'CAN-YSRCP-003', 'M. Venkata Rama Rao', 48, 'B.Sc.', 10, 18),
(70, 'CAN-TDP-003', 'A. Raghuramaiah', 62, 'M.A.', 9, 18),
(71, 'CAN-BJP-018', 'K. S. N. Murthy', 50, 'B.L.', 3, 18),
(72, 'CAN-INC-017', 'P. Anilkumar Yadav', 44, 'MBA', 4, 18),
-- Tirupati (Election 19)
(73, 'CAN-YSRCP-004', 'B. Karunakar Reddy', 55, 'B.A.', 10, 19),
(74, 'CAN-TDP-004', 'M. Venkatesh', 48, 'B.Com', 9, 19),
(75, 'CAN-BJP-019', 'K. Bapi Raju', 52, 'M.A.', 3, 19),
(76, 'CAN-INC-018', 'S. Chengalrayudu', 46, 'B.Ed', 4, 19),
-- Rajahmundry (Election 20)
(77, 'CAN-YSRCP-005', 'A. Satyanarayana', 50, 'M.A.', 10, 20),
(78, 'CAN-TDP-005', 'G. S. R. Prasad', 56, 'B.Sc.', 9, 20),
(79, 'CAN-BJP-020', 'N. Ramesh Kumar', 44, 'MBA', 3, 20),
(80, 'CAN-INC-019', 'D. S. Varma', 48, 'B.Com', 4, 20),
-- Hyderabad Central (Election 21)
(81, 'CAN-TRS-001', 'K. Chandrashekar Rao', 70, 'M.A.', 11, 21),
(82, 'CAN-INC-020', 'Revanth Reddy', 55, 'M.A.', 4, 21),
(83, 'CAN-BJP-021', 'K. Laxman', 58, 'B.Com', 3, 21),
(84, 'CAN-TDP-006', 'E. Rajender', 52, 'B.A.', 9, 21),
-- Secunderabad (Election 22)
(85, 'CAN-TRS-002', 'T. Harish Rao', 52, 'B.Com', 11, 22),
(86, 'CAN-INC-021', 'M. Anjan Kumar Yadav', 56, 'B.A.', 4, 22),
(87, 'CAN-BJP-022', 'D. Arvind', 48, 'MBA', 3, 22),
(88, 'CAN-TDP-007', 'K. V. Prasad', 50, 'M.A.', 9, 22),
-- Warangal East (Election 23)
(89, 'CAN-TRS-003', 'K. E. Prabhakar', 50, 'B.A.', 11, 23),
(90, 'CAN-INC-022', 'N. Rajender Reddy', 46, 'B.Com', 4, 23),
(91, 'CAN-BJP-023', 'R. Rao', 48, 'B.L.', 3, 23),
(92, 'CAN-CPIM-011', 'S. Veeranna', 54, 'M.A.', 6, 23),
-- Karimnagar (Election 24)
(93, 'CAN-TRS-004', 'G. Kamalakar', 48, 'B.Com', 11, 24),
(94, 'CAN-INC-023', 'V. Rajesh', 44, 'MBA', 4, 24),
(95, 'CAN-BJP-024', 'B. Suresh', 50, 'B.A.', 3, 24),
(96, 'CAN-CPIM-012', 'K. Narasaiah', 52, 'M.A.', 6, 24),
-- Nizamabad (Election 25)
(97, 'CAN-TRS-005', 'K. Kavitha', 46, 'B.Tech', 11, 25),
(98, 'CAN-INC-024', 'M. Srinivas Reddy', 52, 'M.A.', 4, 25),
(99, 'CAN-BJP-025', 'D. K. Aruna', 56, 'B.A.', 3, 25),
(100, 'CAN-TDP-008', 'P. Sudhakar Reddy', 48, 'B.Com', 9, 25);

-- ============================================================
-- VOTERS (6 per constituency = 150 total)
-- ============================================================
INSERT INTO voters (id, voter_code, name, dob, gender, phone, address, constituency_id) VALUES
-- Chennai Central
(1, 'VTR-CHN-001', 'Rajesh Kumar', '1985-03-15', 'Male', '9876543210', '45, T Nagar, Chennai', 1),
(2, 'VTR-CHN-002', 'Priya Lakshmi', '1990-07-22', 'Female', '9876543211', '12, Anna Nagar, Chennai', 1),
(3, 'VTR-CHN-003', 'Arun Prakash', '1987-10-14', 'Male', '9876543220', '56, T Nagar, Chennai', 1),
(4, 'VTR-CHN-004', 'Divya S', '1993-01-20', 'Female', '9876543221', '34, Anna Nagar, Chennai', 1),
(5, 'VTR-CHN-005', 'Balaji N', '1986-12-01', 'Male', '9876543230', '91, T Nagar, Chennai', 1),
(6, 'VTR-CHN-006', 'Shanthi P', '1988-04-17', 'Female', '9876543231', '22, Anna Nagar, Chennai', 1),
-- Chennai South
(7, 'VTR-CHN-007', 'Suresh Babu', '1982-11-08', 'Male', '9876543212', '78, Adyar, Chennai', 2),
(8, 'VTR-CHN-008', 'Kavitha Rajan', '1988-05-30', 'Female', '9876543213', '23, Besant Nagar, Chennai', 2),
(9, 'VTR-CHN-009', 'Senthil Kumar', '1984-07-08', 'Male', '9876543222', '12, Adyar, Chennai', 2),
(10, 'VTR-CHN-010', 'Revathi M', '1989-03-25', 'Female', '9876543223', '45, Besant Nagar, Chennai', 2),
(11, 'VTR-CHN-011', 'Kumaravel M', '1983-09-09', 'Male', '9876543232', '56, Adyar, Chennai', 2),
(12, 'VTR-CHN-012', 'Geetha S', '1991-01-23', 'Female', '9876543233', '34, Besant Nagar, Chennai', 2),
-- Coimbatore North
(13, 'VTR-CBE-001', 'Mohan Das', '1980-09-12', 'Male', '9876543214', '56, Peelamedu, Coimbatore', 3),
(14, 'VTR-CBE-002', 'Latha Devi', '1992-02-18', 'Female', '9876543215', '89, Coimbatore City', 3),
(15, 'VTR-CBE-003', 'Ramesh K', '1981-11-30', 'Male', '9876543224', '78, Peelamedu, Coimbatore', 3),
(16, 'VTR-CBE-004', 'Anitha R', '1995-05-12', 'Female', '9876543225', '23, Coimbatore City', 3),
(17, 'VTR-CBE-005', 'Sivakumar V', '1980-05-28', 'Male', '9876543234', '78, Peelamedu, Coimbatore', 3),
(18, 'VTR-CBE-006', 'Lakshmi K', '1994-07-11', 'Female', '9876543235', '23, Coimbatore City', 3),
-- Madurai East
(19, 'VTR-MDU-001', 'Karthik Raja', '1986-08-25', 'Male', '9876543216', '34, Madurai Main', 4),
(20, 'VTR-MDU-002', 'Sundari Balan', '1994-12-10', 'Female', '9876543217', '67, Madurai East', 4),
(21, 'VTR-MDU-003', 'Prakash S', '1985-09-18', 'Male', '9876543226', '56, Madurai Main', 4),
(22, 'VTR-MDU-004', 'Kamala D', '1990-02-04', 'Female', '9876543227', '89, Madurai East', 4),
(23, 'VTR-MDU-005', 'Rajendran P', '1987-10-06', 'Male', '9876543236', '56, Madurai Main', 4),
(24, 'VTR-MDU-006', 'Padmavathi R', '1989-03-19', 'Female', '9876543237', '89, Madurai East', 4),
-- Salem City
(25, 'VTR-SLM-001', 'Venkatesh P', '1983-04-05', 'Male', '9876543218', '91, Salem Town', 5),
(26, 'VTR-SLM-002', 'Meena Kumari', '1991-06-28', 'Female', '9876543219', '22, Salem Junction', 5),
(27, 'VTR-SLM-003', 'Sundar R', '1982-06-22', 'Male', '9876543228', '34, Salem Town', 5),
(28, 'VTR-SLM-004', 'Vijaya L', '1992-08-15', 'Female', '9876543229', '67, Salem Junction', 5),
(29, 'VTR-SLM-005', 'Natarajan T', '1984-08-02', 'Male', '9876543238', '34, Salem Town', 5),
(30, 'VTR-SLM-006', 'Mangalam S', '1993-06-14', 'Female', '9876543239', '67, Salem Junction', 5),
-- Thiruvananthapuram Central
(31, 'VTR-TVM-001', 'Arun Kumar N', '1988-03-12', 'Male', '9447012345', 'Thycaud, TVM', 6),
(32, 'VTR-TVM-002', 'Lekha R Nair', '1992-07-05', 'Female', '9447012346', 'Vellayambalam, TVM', 6),
(33, 'VTR-TVM-003', 'Sajeev Krishnan', '1985-11-18', 'Male', '9447012347', 'Kowdiar, TVM', 6),
(34, 'VTR-TVM-004', 'Deepa Mohan', '1990-01-30', 'Female', '9447012348', 'Pattom, TVM', 6),
(35, 'VTR-TVM-005', 'Vinod Kumar P', '1983-05-22', 'Male', '9447012349', 'Kesavadasapuram, TVM', 6),
(36, 'VTR-TVM-006', 'Rema Devi S', '1994-09-14', 'Female', '9447012350', 'Sasthamangalam, TVM', 6),
-- Ernakulam
(37, 'VTR-EKM-001', 'Joseph Thomas', '1986-06-08', 'Male', '9447023451', 'Marine Drive, EKM', 7),
(38, 'VTR-EKM-002', 'Meri Jacob', '1991-02-20', 'Female', '9447023452', 'Edappally, EKM', 7),
(39, 'VTR-EKM-003', 'Anil Varkey', '1984-10-15', 'Male', '9447023453', 'Kaloor, EKM', 7),
(40, 'VTR-EKM-004', 'Saramma Philip', '1989-04-03', 'Female', '9447023454', 'Vytilla, EKM', 7),
(41, 'VTR-EKM-005', 'Rajan Mathew', '1982-12-28', 'Male', '9447023455', 'Palarivattom, EKM', 7),
(42, 'VTR-EKM-006', 'Aleyamma Varghese', '1993-08-11', 'Female', '9447023456', 'Thrippunithura, EKM', 7),
-- Kozhikode North
(43, 'VTR-KKD-001', 'Pavithran Nair', '1987-04-17', 'Male', '9447034561', 'Beach Road, KKD', 8),
(44, 'VTR-KKD-002', 'Fathima Beevi', '1990-12-01', 'Female', '9447034562', 'Mavoor Road, KKD', 8),
(45, 'VTR-KKD-003', 'Moidu Koya', '1983-08-23', 'Male', '9447034563', 'Palayam, KKD', 8),
(46, 'VTR-KKD-004', 'Kadeeja Kutty', '1992-06-15', 'Female', '9447034564', 'Nadakkavu, KKD', 8),
(47, 'VTR-KKD-005', 'Ashraf K M', '1985-02-09', 'Male', '9447034565', 'East Nadakkavu, KKD', 8),
(48, 'VTR-KKD-006', 'Shameera P K', '1994-10-27', 'Female', '9447034566', 'West Hill, KKD', 8),
-- Thrissur
(49, 'VTR-TSR-001', 'Harikrishnan K', '1986-01-14', 'Male', '9447045671', 'Swaraj Round, TSR', 9),
(50, 'VTR-TSR-002', 'Sreelatha Menon', '1991-05-28', 'Female', '9447045672', 'Ollur, TSR', 9),
(51, 'VTR-TSR-003', 'Gopalan Nair', '1984-09-03', 'Male', '9447045673', 'Punkunnam, TSR', 9),
(52, 'VTR-TSR-004', 'Usha Kumari P', '1988-11-19', 'Female', '9447045674', 'Koorkenchery, TSR', 9),
(53, 'VTR-TSR-005', 'Balachandran M', '1982-03-07', 'Male', '9447045675', 'Irinjalakuda, TSR', 9),
(54, 'VTR-TSR-006', 'Indira Gopal', '1993-07-25', 'Female', '9447045676', 'Chavakkad, TSR', 9),
-- Kollam
(55, 'VTR-KLM-001', 'Raveendran Pillai', '1987-06-20', 'Male', '9447056781', 'Beach Road, KLM', 10),
(56, 'VTR-KLM-002', 'Sindhu Nair', '1992-02-14', 'Female', '9447056782', 'Chinnakada, KLM', 10),
(57, 'VTR-KLM-003', 'Sukumaran K P', '1985-10-08', 'Male', '9447056783', 'Kottiyam, KLM', 10),
(58, 'VTR-KLM-004', 'Ambika Devi', '1990-04-22', 'Female', '9447056784', 'Punalur, KLM', 10),
(59, 'VTR-KLM-005', 'Vinod Kumar R', '1983-12-16', 'Male', '9447056785', 'Kundara, KLM', 10),
(60, 'VTR-KLM-006', 'Saraswathi Amma', '1994-08-30', 'Female', '9447056786', 'Karunagappally, KLM', 10),
-- Bangalore Central
(61, 'VTR-BLR-001', 'Raghavendra Prabhu', '1988-04-12', 'Male', '9900123451', 'Palace Road, BLR', 11),
(62, 'VTR-BLR-002', 'Anjali Sharma', '1993-08-25', 'Female', '9900123452', 'Mallehwaram, BLR', 11),
(63, 'VTR-BLR-003', 'Venkatesh Murthy', '1985-12-07', 'Male', '9900123453', 'Rajajinagar, BLR', 11),
(64, 'VTR-BLR-004', 'Lakshmi Narayan', '1990-06-18', 'Female', '9900123454', 'Basavanagudi, BLR', 11),
(65, 'VTR-BLR-005', 'Kiran Gowda', '1982-02-03', 'Male', '9900123455', 'Vijayanagar, BLR', 11),
(66, 'VTR-BLR-006', 'Sunanda Rao', '1994-10-29', 'Female', '9900123456', 'Yeshwanthpur, BLR', 11),
-- Bangalore South
(67, 'VTR-BLR-007', 'Suresh Gowda', '1987-07-14', 'Male', '9900123457', 'Jayanagar, BLR', 12),
(68, 'VTR-BLR-008', 'Meera Reddy', '1991-11-26', 'Female', '9900123458', 'JP Nagar, BLR', 12),
(69, 'VTR-BLR-009', 'Arun Kumar C', '1984-03-09', 'Male', '9900123459', 'BTM Layout, BLR', 12),
(70, 'VTR-BLR-010', 'Padma Shri', '1989-09-21', 'Female', '9900123460', 'HSR Layout, BLR', 12),
(71, 'VTR-BLR-011', 'Mahesh Bhat', '1983-05-17', 'Male', '9900123461', 'Koramangala, BLR', 12),
(72, 'VTR-BLR-012', 'Vani Harish', '1992-01-05', 'Female', '9900123462', 'Indiranagar, BLR', 12),
-- Mysore
(73, 'VTR-MYS-001', 'Chandra Shekar', '1986-10-15', 'Male', '9900234561', 'Palace Road, MYS', 13),
(74, 'VTR-MYS-002', 'Vidya Devi', '1990-04-28', 'Female', '9900234562', 'Saraswathipuram, MYS', 13),
(75, 'VTR-MYS-003', 'Rangaswamy K', '1984-08-10', 'Male', '9900234563', 'Gokulam, MYS', 13),
(76, 'VTR-MYS-004', 'Savitri B N', '1993-12-22', 'Female', '9900234564', 'Jayalakshmipuram, MYS', 13),
(77, 'VTR-MYS-005', 'Nanjunda Swamy', '1982-06-04', 'Male', '9900234565', 'Hebbal, MYS', 13),
(78, 'VTR-MYS-006', 'Prema Kantaraj', '1991-02-16', 'Female', '9900234566', 'Kuvempunagar, MYS', 13),
-- Hubli-Dharwad
(79, 'VTR-HBL-001', 'Basavaraj Hiremath', '1987-03-19', 'Male', '9900345671', 'Vidyanagar, HBL', 14),
(80, 'VTR-HBL-002', 'Shashikala Joshi', '1992-07-31', 'Female', '9900345672', 'Deshpande Nagar, HBL', 14),
(81, 'VTR-HBL-003', 'Ishwar Chitnis', '1985-11-13', 'Male', '9900345673', 'Unakal, HBL', 14),
(82, 'VTR-HBL-004', 'Kalpana Desai', '1990-05-25', 'Female', '9900345674', 'Nekar Nagar, HBL', 14),
(83, 'VTR-HBL-005', 'Prabhakar Patil', '1983-09-07', 'Male', '9900345675', 'CBT Area, HBL', 14),
(84, 'VTR-HBL-006', 'Savita Kulkarni', '1994-01-19', 'Female', '9900345676', 'Mugi Sector, HBL', 14),
-- Mangalore
(85, 'VTR-MGL-001', 'Dinesh Shetty', '1986-08-22', 'Male', '9900456781', 'Hampankatta, MGL', 15),
(86, 'VTR-MGL-002', 'Vasundhara Rao', '1991-04-05', 'Female', '9900456782', 'Kadri, MGL', 15),
(87, 'VTR-MGL-003', 'Srinivas Kamath', '1984-12-17', 'Male', '9900456783', 'Lighthouse Hill, MGL', 15),
(88, 'VTR-MGL-004', 'Prabha Alva', '1989-06-29', 'Female', '9900456784', 'Bendoor, MGL', 15),
(89, 'VTR-MGL-005', 'Ganesh Bhat K', '1982-10-11', 'Male', '9900456785', 'Kulshekar, MGL', 15),
(90, 'VTR-MGL-006', 'Sumati Nayak', '1993-02-23', 'Female', '9900456786', 'Surathkal, MGL', 15),
-- Visakhapatnam East
(91, 'VTR-VSK-001', 'Ramesh Babu G', '1987-05-14', 'Male', '9880012341', 'Beach Road, VZG', 16),
(92, 'VTR-VSK-002', 'Lakshmi Kumari P', '1992-09-26', 'Female', '9880012342', 'Seethammadhara, VZG', 16),
(93, 'VTR-VSK-003', 'Venkata Rao N', '1985-01-08', 'Male', '9880012343', 'Dwaraka Nagar, VZG', 16),
(94, 'VTR-VSK-004', 'Padmavathi D', '1990-11-20', 'Female', '9880012344', 'MVP Colony, VZG', 16),
(95, 'VTR-VSK-005', 'Suryanarayana M', '1983-07-02', 'Male', '9880012345', 'Siripuram, VZG', 16),
(96, 'VTR-VSK-006', 'Satyavathi R', '1994-03-16', 'Female', '9880012346', 'Akkayyapalem, VZG', 16),
-- Vijayawada Central
(97, 'VTR-VJW-001', 'Krishna Murthy K', '1986-06-10', 'Male', '9880023451', 'Governorpet, VJW', 17),
(98, 'VTR-VJW-002', 'Sarada Devi B', '1991-10-22', 'Female', '9880023452', 'Moghalrajpuram, VJW', 17),
(99, 'VTR-VJW-003', 'Prasad Reddy T', '1984-02-04', 'Male', '9880023453', 'Benz Circle, VJW', 17),
(100, 'VTR-VJW-004', 'Rajyalakshmi V', '1989-08-16', 'Female', '9880023454', 'Labbipet, VJW', 17),
(101, 'VTR-VJW-005', 'Nageswara Rao C', '1983-12-28', 'Male', '9880023455', 'Gunadala, VJW', 17),
(102, 'VTR-VJW-006', 'Annapurna S', '1993-04-09', 'Female', '9880023456', 'Patamata, VJW', 17),
-- Guntur West
(103, 'VTR-GNT-001', 'Ravi Teja K', '1987-03-15', 'Male', '9880034561', 'Arundelpet, GNT', 18),
(104, 'VTR-GNT-002', 'Nagamani P', '1992-07-27', 'Female', '9880034562', 'Brodipet, GNT', 18),
(105, 'VTR-GNT-003', 'Seshaiah B', '1985-11-09', 'Male', '9880034563', 'Kornepadu, GNT', 18),
(106, 'VTR-GNT-004', 'Vijaya Lakshmi D', '1990-05-21', 'Female', '9880034564', 'Nallapadu, GNT', 18),
(107, 'VTR-GNT-005', 'Venkateswarlu R', '1982-09-03', 'Male', '9880034565', 'Pattabhipuram, GNT', 18),
(108, 'VTR-GNT-006', 'Swarnalatha M', '1994-01-15', 'Female', '9880034566', 'Lakshmipuram, GNT', 18),
-- Tirupati
(109, 'VTR-TPT-001', 'Srinivasa Reddy K', '1986-04-18', 'Male', '9880045671', 'Alipiri, TPT', 19),
(110, 'VTR-TPT-002', 'Padmavathi Amma', '1991-08-30', 'Female', '9880045672', 'Tiruchanoor, TPT', 19),
(111, 'VTR-TPT-003', 'Govindarajulu M', '1984-12-12', 'Male', '9880045673', 'Karakambadi, TPT', 19),
(112, 'VTR-TPT-004', 'Ranganayaki S', '1989-06-24', 'Female', '9880045674', 'Renigunta, TPT', 19),
(113, 'VTR-TPT-005', 'Chandrasekhar N', '1983-10-06', 'Male', '9880045675', 'Chandragiri, TPT', 19),
(114, 'VTR-TPT-006', 'Kamakshi Devi P', '1993-02-18', 'Female', '9880045676', 'Mangalam, TPT', 19),
-- Rajahmundry
(115, 'VTR-RJY-001', 'Satyanarayana Raju', '1987-07-21', 'Male', '9880056781', 'Pushkar Ghat, RJY', 20),
(116, 'VTR-RJY-002', 'Vijaya Durga T', '1992-11-03', 'Female', '9880056782', 'Danavaipeta, RJY', 20),
(117, 'VTR-RJY-003', 'Venkata Ramana G', '1985-03-15', 'Male', '9880056783', 'Kotipalli, RJY', 20),
(118, 'VTR-RJY-004', 'Annapurna Kumari', '1990-09-27', 'Female', '9880056784', 'Jampet, RJY', 20),
(119, 'VTR-RJY-005', 'Raja Sekhar P', '1982-05-09', 'Male', '9880056785', 'Subhash Nagar, RJY', 20),
(120, 'VTR-RJY-006', 'Saraswathi Bai L', '1994-01-21', 'Female', '9880056786', 'Aryapuram, RJY', 20),
-- Hyderabad Central
(121, 'VTR-HYD-001', 'Majid Khan', '1988-06-12', 'Male', '9770012341', 'Basheer Bagh, HYD', 21),
(122, 'VTR-HYD-002', 'Farhana Begum', '1993-10-24', 'Female', '9770012342', 'Abids, HYD', 21),
(123, 'VTR-HYD-003', 'Rajeshwar Rao', '1985-02-05', 'Male', '9770012343', 'Koti, HYD', 21),
(124, 'VTR-HYD-004', 'Sujatha Devi P', '1990-08-17', 'Female', '9770012344', 'Nampally, HYD', 21),
(125, 'VTR-HYD-005', 'Anwar Ali S', '1983-04-29', 'Male', '9770012345', 'Chikkadpally, HYD', 21),
(126, 'VTR-HYD-006', 'Rahmathunnisa B', '1992-12-11', 'Female', '9770012346', 'Moghalpura, HYD', 21),
-- Secunderabad
(127, 'VTR-SEC-001', 'David Raju', '1987-03-18', 'Male', '9770023451', 'Cantonment, SEC', 22),
(128, 'VTR-SEC-002', 'Mary Prasanna', '1991-07-30', 'Female', '9770023452', 'Bolarum, SEC', 22),
(129, 'VTR-SEC-003', 'Suresh Babu K', '1984-11-12', 'Male', '9770023453', 'Tirumalgherry, SEC', 22),
(130, 'VTR-SEC-004', 'Kavitha Rani M', '1989-05-24', 'Female', '9770023454', 'Marredpally, SEC', 22),
(131, 'VTR-SEC-005', 'Johnson P', '1982-09-05', 'Male', '9770023455', 'West Marredpally, SEC', 22),
(132, 'VTR-SEC-006', 'Vimala Thomas', '1994-01-17', 'Female', '9770023456', 'East Marredpally, SEC', 22),
-- Warangal East
(133, 'VTR-WGL-001', 'Ramdas P', '1986-08-20', 'Male', '9770034561', 'Hanamkonda, WGL', 23),
(134, 'VTR-WGL-002', 'Swarnalatha R', '1991-04-02', 'Female', '9770034562', 'Kazipet, WGL', 23),
(135, 'VTR-WGL-003', 'Eshwar Rao K', '1984-12-14', 'Male', '9770034563', 'Nakkalagutta, WGL', 23),
(136, 'VTR-WGL-004', 'Padma Priya B', '1989-06-26', 'Female', '9770034564', 'Fathenagar, WGL', 23),
(137, 'VTR-WGL-005', 'Sambaiah M', '1983-10-08', 'Male', '9770034565', 'Matwada, WGL', 23),
(138, 'VTR-WGL-006', 'Laxmi Devi N', '1993-02-20', 'Female', '9770034566', 'Bhadrakali, WGL', 23),
-- Karimnagar
(139, 'VTR-KRN-001', 'Srinivas Reddy G', '1987-07-14', 'Male', '9770045671', 'Main Road, KRN', 24),
(140, 'VTR-KRN-002', 'Vijaya Lakshmi T', '1992-11-26', 'Female', '9770045672', 'Mukarampura, KRN', 24),
(141, 'VTR-KRN-003', 'Prakash Chandra', '1985-03-08', 'Male', '9770045673', 'Tower Circle, KRN', 24),
(142, 'VTR-KRN-004', 'Saritha Devi K', '1990-09-20', 'Female', '9770045674', 'Civil Lines, KRN', 24),
(143, 'VTR-KRN-005', 'Rajender Goud', '1983-05-02', 'Male', '9770045675', 'Mancherial Road, KRN', 24),
(144, 'VTR-KRN-006', 'Padmaja Rani S', '1994-01-14', 'Female', '9770045676', 'Bhagath Nagar, KRN', 24),
-- Nizamabad
(145, 'VTR-NZB-001', 'Vishnuvardhan R', '1986-06-16', 'Male', '9770056781', 'Bus Stand Area, NZB', 25),
(146, 'VTR-NZB-002', 'Nirmala Devi P', '1991-10-28', 'Female', '9770056782', 'Pragathi Nagar, NZB', 25),
(147, 'VTR-NZB-003', 'Ramesh Goud M', '1984-02-10', 'Male', '9770056783', 'Kanteshwar, NZB', 25),
(148, 'VTR-NZB-004', 'Sujatha Reddy B', '1989-08-22', 'Female', '9770056784', 'Dichpally, NZB', 25),
(149, 'VTR-NZB-005', 'Sreedhar Babu K', '1983-12-04', 'Male', '9770056785', 'Mugpal, NZB', 25),
(150, 'VTR-NZB-006', 'Kamalamma T', '1993-04-16', 'Female', '9770056786', 'Yedapally, NZB', 25);

-- ============================================================
-- VOTES (4 per constituency = 100 total, spread across voters)
-- ============================================================
INSERT INTO votes (id, vote_number, cast_at, voter_id, candidate_id, election_id, polling_station_id) VALUES
-- Chennai Central votes (DMK wins 3-1)
(1, 'VOTE-TN-001', '2026-05-06T08:30:00', 1, 1, 1, 1),
(2, 'VOTE-TN-002', '2026-05-06T08:45:00', 2, 1, 1, 1),
(3, 'VOTE-TN-003', '2026-05-06T09:00:00', 3, 2, 1, 1),
(4, 'VOTE-TN-004', '2026-05-06T09:15:00', 4, 1, 1, 2),
-- Chennai South votes (DMK wins 3-1)
(5, 'VOTE-TN-005', '2026-05-06T08:30:00', 7, 5, 2, 3),
(6, 'VOTE-TN-006', '2026-05-06T08:45:00', 8, 5, 2, 3),
(7, 'VOTE-TN-007', '2026-05-06T09:00:00', 9, 6, 2, 3),
(8, 'VOTE-TN-008', '2026-05-06T09:15:00', 10, 5, 2, 4),
-- Coimbatore North votes (DMK wins 3-1)
(9, 'VOTE-TN-009', '2026-05-06T09:30:00', 13, 9, 3, 5),
(10, 'VOTE-TN-010', '2026-05-06T09:45:00', 14, 9, 3, 5),
(11, 'VOTE-TN-011', '2026-05-06T10:00:00', 15, 10, 3, 5),
(12, 'VOTE-TN-012', '2026-05-06T10:15:00', 16, 9, 3, 6),
-- Madurai East votes (DMK wins 3-1)
(13, 'VOTE-TN-013', '2026-05-06T10:30:00', 19, 13, 4, 7),
(14, 'VOTE-TN-014', '2026-05-06T10:45:00', 20, 13, 4, 7),
(15, 'VOTE-TN-015', '2026-05-06T11:00:00', 21, 14, 4, 7),
(16, 'VOTE-TN-016', '2026-05-06T11:15:00', 22, 13, 4, 8),
-- Salem City votes (DMK wins 2-2, tie)
(17, 'VOTE-TN-017', '2026-05-06T11:30:00', 25, 17, 5, 9),
(18, 'VOTE-TN-018', '2026-05-06T11:45:00', 26, 18, 5, 9),
(19, 'VOTE-TN-019', '2026-05-06T12:00:00', 27, 17, 5, 9),
(20, 'VOTE-TN-020', '2026-05-06T12:15:00', 28, 18, 5, 10),
-- Thiruvananthapuram Central votes (CPIM wins 3-1)
(21, 'VOTE-KL-001', '2026-04-20T08:30:00', 31, 21, 6, 11),
(22, 'VOTE-KL-002', '2026-04-20T08:45:00', 32, 21, 6, 11),
(23, 'VOTE-KL-003', '2026-04-20T09:00:00', 33, 22, 6, 11),
(24, 'VOTE-KL-004', '2026-04-20T09:15:00', 34, 21, 6, 12),
-- Ernakulam votes (INC wins 3-1)
(25, 'VOTE-KL-005', '2026-04-20T09:30:00', 37, 26, 7, 13),
(26, 'VOTE-KL-006', '2026-04-20T09:45:00', 38, 26, 7, 13),
(27, 'VOTE-KL-007', '2026-04-20T10:00:00', 39, 25, 7, 13),
(28, 'VOTE-KL-008', '2026-04-20T10:15:00', 40, 26, 7, 14),
-- Kozhikode North votes (CPIM wins 3-1)
(29, 'VOTE-KL-009', '2026-04-20T10:30:00', 43, 29, 8, 15),
(30, 'VOTE-KL-010', '2026-04-20T10:45:00', 44, 29, 8, 15),
(31, 'VOTE-KL-011', '2026-04-20T11:00:00', 45, 30, 8, 15),
(32, 'VOTE-KL-012', '2026-04-20T11:15:00', 46, 29, 8, 16),
-- Thrissur votes (CPIM wins 2-2, tie)
(33, 'VOTE-KL-013', '2026-04-20T11:30:00', 49, 33, 9, 17),
(34, 'VOTE-KL-014', '2026-04-20T11:45:00', 50, 34, 9, 17),
(35, 'VOTE-KL-015', '2026-04-20T12:00:00', 51, 33, 9, 17),
(36, 'VOTE-KL-016', '2026-04-20T12:15:00', 52, 34, 9, 18),
-- Kollam votes (CPIM wins 3-1)
(37, 'VOTE-KL-017', '2026-04-20T12:30:00', 55, 37, 10, 19),
(38, 'VOTE-KL-018', '2026-04-20T12:45:00', 56, 37, 10, 19),
(39, 'VOTE-KL-019', '2026-04-20T13:00:00', 57, 38, 10, 19),
(40, 'VOTE-KL-020', '2026-04-20T13:15:00', 58, 37, 10, 20),
-- Bangalore Central votes (INC wins 3-1)
(41, 'VOTE-KA-001', '2026-03-15T08:30:00', 61, 41, 11, 21),
(42, 'VOTE-KA-002', '2026-03-15T08:45:00', 62, 41, 11, 21),
(43, 'VOTE-KA-003', '2026-03-15T09:00:00', 63, 42, 11, 21),
(44, 'VOTE-KA-004', '2026-03-15T09:15:00', 64, 41, 11, 22),
-- Bangalore South votes (BJP wins 3-1)
(45, 'VOTE-KA-005', '2026-03-15T09:30:00', 67, 46, 12, 23),
(46, 'VOTE-KA-006', '2026-03-15T09:45:00', 68, 46, 12, 23),
(47, 'VOTE-KA-007', '2026-03-15T10:00:00', 69, 45, 12, 23),
(48, 'VOTE-KA-008', '2026-03-15T10:15:00', 70, 46, 12, 24),
-- Mysore votes (INC wins 3-1)
(49, 'VOTE-KA-009', '2026-03-15T10:30:00', 73, 49, 13, 25),
(50, 'VOTE-KA-010', '2026-03-15T10:45:00', 74, 49, 13, 25),
(51, 'VOTE-KA-011', '2026-03-15T11:00:00', 75, 50, 13, 25),
(52, 'VOTE-KA-012', '2026-03-15T11:15:00', 76, 49, 13, 26),
-- Hubli-Dharwad votes (BJP wins 3-1)
(53, 'VOTE-KA-013', '2026-03-15T11:30:00', 79, 54, 14, 27),
(54, 'VOTE-KA-014', '2026-03-15T11:45:00', 80, 54, 14, 27),
(55, 'VOTE-KA-015', '2026-03-15T12:00:00', 81, 53, 14, 27),
(56, 'VOTE-KA-016', '2026-03-15T12:15:00', 82, 54, 14, 28),
-- Mangalore votes (INC wins 3-1)
(57, 'VOTE-KA-017', '2026-03-15T12:30:00', 85, 57, 15, 29),
(58, 'VOTE-KA-018', '2026-03-15T12:45:00', 86, 57, 15, 29),
(59, 'VOTE-KA-019', '2026-03-15T13:00:00', 87, 58, 15, 29),
(60, 'VOTE-KA-020', '2026-03-15T13:15:00', 88, 57, 15, 30),
-- Visakhapatnam East votes (YSRCP wins 3-1)
(61, 'VOTE-AP-001', '2026-06-01T08:30:00', 91, 61, 16, 31),
(62, 'VOTE-AP-002', '2026-06-01T08:45:00', 92, 61, 16, 31),
(63, 'VOTE-AP-003', '2026-06-01T09:00:00', 93, 62, 16, 31),
(64, 'VOTE-AP-004', '2026-06-01T09:15:00', 94, 61, 16, 32),
-- Vijayawada Central votes (YSRCP wins 3-1)
(65, 'VOTE-AP-005', '2026-06-01T09:30:00', 97, 65, 17, 33),
(66, 'VOTE-AP-006', '2026-06-01T09:45:00', 98, 65, 17, 33),
(67, 'VOTE-AP-007', '2026-06-01T10:00:00', 99, 66, 17, 33),
(68, 'VOTE-AP-008', '2026-06-01T10:15:00', 100, 65, 17, 34),
-- Guntur West votes (TDP wins 3-1)
(69, 'VOTE-AP-009', '2026-06-01T10:30:00', 103, 70, 18, 35),
(70, 'VOTE-AP-010', '2026-06-01T10:45:00', 104, 70, 18, 35),
(71, 'VOTE-AP-011', '2026-06-01T11:00:00', 105, 69, 18, 35),
(72, 'VOTE-AP-012', '2026-06-01T11:15:00', 106, 70, 18, 36),
-- Tirupati votes (YSRCP wins 3-1)
(73, 'VOTE-AP-013', '2026-06-01T11:30:00', 109, 73, 19, 37),
(74, 'VOTE-AP-014', '2026-06-01T11:45:00', 110, 73, 19, 37),
(75, 'VOTE-AP-015', '2026-06-01T12:00:00', 111, 74, 19, 37),
(76, 'VOTE-AP-016', '2026-06-01T12:15:00', 112, 73, 19, 38),
-- Rajahmundry votes (TDP wins 3-1)
(77, 'VOTE-AP-017', '2026-06-01T12:30:00', 115, 78, 20, 39),
(78, 'VOTE-AP-018', '2026-06-01T12:45:00', 116, 78, 20, 39),
(79, 'VOTE-AP-019', '2026-06-01T13:00:00', 117, 77, 20, 39),
(80, 'VOTE-AP-020', '2026-06-01T13:15:00', 118, 78, 20, 40),
-- Hyderabad Central votes (TRS wins 3-1)
(81, 'VOTE-TS-001', '2026-02-10T08:30:00', 121, 81, 21, 41),
(82, 'VOTE-TS-002', '2026-02-10T08:45:00', 122, 81, 21, 41),
(83, 'VOTE-TS-003', '2026-02-10T09:00:00', 123, 82, 21, 41),
(84, 'VOTE-TS-004', '2026-02-10T09:15:00', 124, 81, 21, 42),
-- Secunderabad votes (TRS wins 3-1)
(85, 'VOTE-TS-005', '2026-02-10T09:30:00', 127, 85, 22, 43),
(86, 'VOTE-TS-006', '2026-02-10T09:45:00', 128, 85, 22, 43),
(87, 'VOTE-TS-007', '2026-02-10T10:00:00', 129, 86, 22, 43),
(88, 'VOTE-TS-008', '2026-02-10T10:15:00', 130, 85, 22, 44),
-- Warangal East votes (TRS wins 3-1)
(89, 'VOTE-TS-009', '2026-02-10T10:30:00', 133, 89, 23, 45),
(90, 'VOTE-TS-010', '2026-02-10T10:45:00', 134, 89, 23, 45),
(91, 'VOTE-TS-011', '2026-02-10T11:00:00', 135, 90, 23, 45),
(92, 'VOTE-TS-012', '2026-02-10T11:15:00', 136, 89, 23, 46),
-- Karimnagar votes (TRS wins 3-1)
(93, 'VOTE-TS-013', '2026-02-10T11:30:00', 139, 93, 24, 47),
(94, 'VOTE-TS-014', '2026-02-10T11:45:00', 140, 93, 24, 47),
(95, 'VOTE-TS-015', '2026-02-10T12:00:00', 141, 94, 24, 47),
(96, 'VOTE-TS-016', '2026-02-10T12:15:00', 142, 93, 24, 48),
-- Nizamabad votes (TRS wins 3-1)
(97, 'VOTE-TS-017', '2026-02-10T12:30:00', 145, 97, 25, 49),
(98, 'VOTE-TS-018', '2026-02-10T12:45:00', 146, 97, 25, 49),
(99, 'VOTE-TS-019', '2026-02-10T13:00:00', 147, 98, 25, 49),
(100, 'VOTE-TS-020', '2026-02-10T13:15:00', 148, 97, 25, 50);

-- H2 auto-increment restart statements (H2-specific, not run in prod)
ALTER TABLE states ALTER COLUMN id RESTART WITH 6;
ALTER TABLE constituencies ALTER COLUMN id RESTART WITH 26;
ALTER TABLE polling_stations ALTER COLUMN id RESTART WITH 51;
ALTER TABLE parties ALTER COLUMN id RESTART WITH 13;
ALTER TABLE elections ALTER COLUMN id RESTART WITH 26;
ALTER TABLE candidates ALTER COLUMN id RESTART WITH 101;
ALTER TABLE voters ALTER COLUMN id RESTART WITH 151;
ALTER TABLE votes ALTER COLUMN id RESTART WITH 101;
