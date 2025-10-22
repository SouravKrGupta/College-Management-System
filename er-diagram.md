# ER Diagram for College Management System

## Entities and Relationships

### Entities:

1. **AdminDetails**
   - employeeId (PK)
   - firstName
   - lastName
   - email
   - phone
   - profile
   - address
   - city
   - state
   - pincode
   - country
   - gender
   - dob
   - designation
   - joiningDate
   - salary
   - status
   - isSuperAdmin
   - emergencyContact (name, relationship, phone)
   - bloodGroup
   - password

2. **FacultyDetails**
   - employeeId (PK)
   - firstName
   - lastName
   - email
   - phone
   - profile
   - address
   - city
   - state
   - pincode
   - country
   - gender
   - dob
   - designation
   - joiningDate
   - salary
   - status
   - emergencyContact (name, relationship, phone)
   - bloodGroup
   - branchId (FK to Branch)
   - password

3. **StudentDetails**
   - enrollmentNo (PK)
   - firstName
   - middleName
   - lastName
   - email
   - phone
   - semester
   - branchId (FK to Branch)
   - gender
   - dob
   - address
   - city
   - state
   - pincode
   - country
   - profile
   - status
   - bloodGroup
   - emergencyContact (name, relationship, phone)
   - password

4. **Branch**
   - _id (PK)
   - branchId
   - name

5. **Subject**
   - _id (PK)
   - name
   - code
   - branch (FK to Branch)
   - semester
   - credits

6. **Exam**
   - _id (PK)
   - name
   - date
   - semester
   - examType (mid/end)
   - timetableLink
   - totalMarks

7. **Marks**
   - _id (PK)
   - studentId (FK to StudentDetails)
   - subjectId (FK to Subject)
   - marksObtained
   - semester
   - examId (FK to Exam)

8. **Material**
   - _id (PK)
   - title
   - subject (FK to Subject)
   - faculty (FK to FacultyDetails)
   - file
   - semester
   - branch (FK to Branch)
   - type (notes/assignment/syllabus/other)

9. **Notice**
   - _id (PK)
   - title
   - description
   - type (student/faculty/both)
   - link
   - createdAt

10. **Timetable**
    - _id (PK)
    - link
    - branch (FK to Branch)
    - semester

### Relationships:

- **FacultyDetails** belongs to **Branch** (Many-to-One)
- **StudentDetails** belongs to **Branch** (Many-to-One)
- **Subject** belongs to **Branch** (Many-to-One)
- **Marks** belongs to **StudentDetails** (Many-to-One)
- **Marks** belongs to **Subject** (Many-to-One)
- **Marks** belongs to **Exam** (Many-to-One)
- **Material** belongs to **Subject** (Many-to-One)
- **Material** belongs to **FacultyDetails** (Many-to-One)
- **Material** belongs to **Branch** (Many-to-One)
- **Timetable** belongs to **Branch** (Many-to-One)

## ER Diagram Representation

```
[AdminDetails] -- Manages --> [All Entities]

[FacultyDetails] -- 1:N --> [Material]
[FacultyDetails] -- 1:N --> [Marks] (via grading)

[StudentDetails] -- 1:N --> [Marks]

[Branch] -- 1:N --> [FacultyDetails]
[Branch] -- 1:N --> [StudentDetails]
[Branch] -- 1:N --> [Subject]
[Branch] -- 1:N --> [Material]
[Branch] -- 1:N --> [Timetable]

[Subject] -- 1:N --> [Material]
[Subject] -- 1:N --> [Marks]

[Exam] -- 1:N --> [Marks]

[Notice] -- Broadcasts to --> [FacultyDetails, StudentDetails]
```

## Key Constraints:

- Admin can manage all entities
- Faculty teaches subjects and uploads materials
- Students enroll in subjects and take exams
- Branches contain students, faculty, and subjects
- Marks are recorded for student-subject-exam combinations
- Materials are uploaded by faculty for specific subjects and branches