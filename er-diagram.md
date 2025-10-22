# College Management System - Enhanced ER Diagram

## Entity-Relationship Diagram

```mermaid
erDiagram
    AdminDetails ||--o{ FacultyDetails : manages
    AdminDetails ||--o{ StudentDetails : manages
    AdminDetails ||--o{ Branch : manages
    AdminDetails ||--o{ Subject : manages
    AdminDetails ||--o{ Exam : manages
    AdminDetails ||--o{ Notice : manages
    AdminDetails ||--o{ Timetable : manages
    AdminDetails ||--o{ Material : manages
    AdminDetails ||--o{ Marks : manages

    Branch ||--o{ FacultyDetails : contains
    Branch ||--o{ StudentDetails : contains
    Branch ||--o{ Subject : contains
    Branch ||--o{ Material : contains
    Branch ||--o{ Timetable : contains

    FacultyDetails ||--o{ Material : uploads
    FacultyDetails ||--o{ Marks : assigns

    StudentDetails ||--o{ Marks : receives

    Subject ||--o{ Material : has
    Subject ||--o{ Marks : has

    Exam ||--o{ Marks : has

    AdminDetails {
        string employeeId PK
        string firstName
        string lastName
        string email
        string phone
        string profile
        string address
        string city
        string state
        string pincode
        string country
        string gender
        date dob
        string designation
        date joiningDate
        number salary
        string status
        boolean isSuperAdmin
        object emergencyContact
        string bloodGroup
        string password
    }

    FacultyDetails {
        string employeeId PK
        string firstName
        string lastName
        string email
        string phone
        string profile
        string address
        string city
        string state
        string pincode
        string country
        string gender
        date dob
        string designation
        date joiningDate
        number salary
        string status
        object emergencyContact
        string bloodGroup
        string branchId FK
        string password
    }

    StudentDetails {
        string enrollmentNo PK
        string firstName
        string middleName
        string lastName
        string email
        string phone
        number semester
        string branchId FK
        string gender
        date dob
        string address
        string city
        string state
        string pincode
        string country
        string profile
        string status
        string bloodGroup
        object emergencyContact
        string password
    }

    Branch {
        string _id PK
        string branchId
        string name
    }

    Subject {
        string _id PK
        string name
        string code
        string branch FK
        number semester
        number credits
    }

    Exam {
        string _id PK
        string name
        date date
        number semester
        string examType
        string timetableLink
        number totalMarks
    }

    Marks {
        string _id PK
        string studentId FK
        string subjectId FK
        number marksObtained
        number semester
        string examId FK
    }

    Material {
        string _id PK
        string title
        string subject FK
        string faculty FK
        string file
        number semester
        string branch FK
        string type
    }

    Notice {
        string _id PK
        string title
        string description
        string type
        string link
        date createdAt
    }

    Timetable {
        string _id PK
        string link
        string branch FK
        number semester
    }
```

## Entity Descriptions

### Core User Entities
| Entity | Primary Key | Key Attributes | Relationships |
|--------|-------------|----------------|---------------|
| **AdminDetails** | employeeId | firstName, lastName, email, designation | Manages all entities |
| **FacultyDetails** | employeeId | firstName, lastName, email, branchId | Belongs to Branch, uploads Material, assigns Marks |
| **StudentDetails** | enrollmentNo | firstName, lastName, email, branchId, semester | Belongs to Branch, receives Marks |

### Academic Entities
| Entity | Primary Key | Key Attributes | Relationships |
|--------|-------------|----------------|---------------|
| **Branch** | _id | branchId, name | Contains Faculty, Students, Subjects |
| **Subject** | _id | name, code, branch, semester, credits | Belongs to Branch, has Materials and Marks |
| **Exam** | _id | name, date, semester, examType, totalMarks | Has Marks |

### Content Entities
| Entity | Primary Key | Key Attributes | Relationships |
|--------|-------------|----------------|---------------|
| **Material** | _id | title, subject, faculty, file, type | Belongs to Subject, Faculty, Branch |
| **Notice** | _id | title, description, type, createdAt | Broadcasts to users |
| **Timetable** | _id | link, branch, semester | Belongs to Branch |

### Assessment Entity
| Entity | Primary Key | Key Attributes | Relationships |
|--------|-------------|----------------|---------------|
| **Marks** | _id | studentId, subjectId, marksObtained, examId | Belongs to Student, Subject, Exam |

## Cardinality Legend
- **||--o{** : One to Many (1:N)
- **||--||** : One to One (1:1)
- **}o--o{** : Many to Many (N:M)

## Key Business Rules
1. Each Faculty belongs to exactly one Branch
2. Each Student belongs to exactly one Branch
3. Subjects are offered by specific Branches and semesters
4. Materials are uploaded by Faculty for specific Subjects
5. Marks are recorded for Student-Subject-Exam combinations
6. Notices can target Students, Faculty, or both
7. Timetables are specific to Branch and semester