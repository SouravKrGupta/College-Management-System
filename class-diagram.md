# College Management System - Enhanced Class Diagram

## UML Class Diagram

```mermaid
classDiagram
    class User {
        <<abstract>>
        +String firstName
        +String lastName
        +String email
        +String phone
        +String profile
        +String address
        +String city
        +String state
        +String pincode
        +String country
        +String gender
        +Date dob
        +String status
        +String bloodGroup
        +Object emergencyContact
        +String password
        +login(): boolean
        +logout(): void
        +updateProfile(): void
        +changePassword(): void
    }

    class Admin {
        +String employeeId
        +String designation
        +Date joiningDate
        +Number salary
        +Boolean isSuperAdmin
        +manageStudents(): void
        +manageFaculty(): void
        +manageBranches(): void
        +manageSubjects(): void
        +manageExams(): void
        +manageNotices(): void
        +manageTimetables(): void
        +manageMaterials(): void
        +manageMarks(): void
    }

    class Faculty {
        +String employeeId
        +String designation
        +Date joiningDate
        +Number salary
        +ObjectId branchId
        +uploadMaterial(): void
        +addMarks(): void
        +viewStudents(): void
        +viewTimetable(): void
        +viewNotices(): void
    }

    class Student {
        +String enrollmentNo
        +String middleName
        +Number semester
        +ObjectId branchId
        +viewMarks(): void
        +viewMaterials(): void
        +viewTimetable(): void
        +viewNotices(): void
    }

    class Branch {
        +String _id
        +String branchId
        +String name
        +getStudents(): Array~Student~
        +getFaculty(): Array~Faculty~
        +getSubjects(): Array~Subject~
        +getTimetable(): Timetable
    }

    class Subject {
        +String _id
        +String name
        +String code
        +ObjectId branch
        +Number semester
        +Number credits
        +getMaterials(): Array~Material~
        +getMarks(): Array~Marks~
    }

    class Exam {
        +String _id
        +String name
        +Date date
        +Number semester
        +String examType
        +String timetableLink
        +Number totalMarks
        +getMarks(): Array~Marks~
    }

    class Marks {
        +String _id
        +ObjectId studentId
        +ObjectId subjectId
        +Number marksObtained
        +Number semester
        +ObjectId examId
        +calculateGrade(): String
    }

    class Material {
        +String _id
        +String title
        +ObjectId subject
        +ObjectId faculty
        +String file
        +Number semester
        +ObjectId branch
        +String type
        +download(): void
        +view(): void
    }

    class Notice {
        +String _id
        +String title
        +String description
        +String type
        +String link
        +Date createdAt
        +broadcast(): void
    }

    class Timetable {
        +String _id
        +String link
        +ObjectId branch
        +Number semester
        +view(): void
    }

    %% Inheritance Relationships
    User <|-- Admin : extends
    User <|-- Faculty : extends
    User <|-- Student : extends

    %% Association Relationships
    Admin --> Student : manages 1..*
    Admin --> Faculty : manages 1..*
    Admin --> Branch : manages 1..*
    Admin --> Subject : manages 1..*
    Admin --> Exam : manages 1..*
    Admin --> Notice : manages 1..*
    Admin --> Timetable : manages 1..*
    Admin --> Material : manages 1..*
    Admin --> Marks : manages 1..*

    Faculty --> Branch : belongs to *
    Faculty --> Material : uploads 1..*
    Faculty --> Marks : assigns 1..*

    Student --> Branch : belongs to *
    Student --> Marks : receives 1..*
    Student --> Material : accesses *..*
    Student --> Notice : views *..*
    Student --> Timetable : views *

    Branch --> Student : contains 1..*
    Branch --> Faculty : contains 1..*
    Branch --> Subject : contains 1..*
    Branch --> Timetable : has 1
    Branch --> Material : has 1..*

    Subject --> Branch : belongs to *
    Subject --> Material : has 1..*
    Subject --> Marks : has 1..*

    Exam --> Marks : has 1..*

    Material --> Subject : belongs to *
    Material --> Faculty : uploaded by *
    Material --> Branch : belongs to *

    Notice --> Student : viewed by *..*
    Notice --> Faculty : viewed by *..*

    Timetable --> Branch : belongs to *
    Timetable --> Student : viewed by *..*
    Timetable --> Faculty : viewed by *..*

    Marks --> Student : belongs to *
    Marks --> Subject : belongs to *
    Marks --> Exam : belongs to *
```

## Class Descriptions

### Core Classes

| Class | Type | Description | Key Attributes |
|-------|------|-------------|----------------|
| **User** | Abstract | Base class for all user types | firstName, lastName, email, phone, password |
| **Admin** | Concrete | System administrator with full access | employeeId, designation, isSuperAdmin |
| **Faculty** | Concrete | Teaching staff | employeeId, designation, branchId |
| **Student** | Concrete | Students enrolled in college | enrollmentNo, semester, branchId |

### Supporting Classes

| Class | Description | Key Attributes |
|-------|-------------|----------------|
| **Branch** | Academic departments | branchId, name |
| **Subject** | Course information | name, code, branch, semester, credits |
| **Exam** | Assessment details | name, date, examType, totalMarks |
| **Marks** | Student performance records | studentId, subjectId, marksObtained, examId |
| **Material** | Study resources | title, subject, faculty, file, type |
| **Notice** | Announcements | title, description, type, createdAt |
| **Timetable** | Schedule information | link, branch, semester |

## Relationship Types

### Inheritance
- **Admin**, **Faculty**, and **Student** inherit from **User**
- All user types share common authentication and profile management methods

### Associations
- **Composition**: Branch contains Students, Faculty, Subjects
- **Aggregation**: Admin manages all entities (loose coupling)
- **Dependency**: Users depend on various services (Materials, Notices, etc.)

### Multiplicities
- **1**: Exactly one (e.g., Student belongs to one Branch)
- **1..***: One or more (e.g., Branch has multiple Students)
- ****..*****: Many to many (e.g., Students access multiple Materials)

## Key Design Patterns

### 1. Inheritance Hierarchy
```
User (Abstract)
├── Admin (Full System Access)
├── Faculty (Teaching & Assessment)
└── Student (Learning & Information Access)
```

### 2. Role-Based Access Control
- Each user type has specific permissions
- Admin: CRUD on all entities
- Faculty: Upload materials, manage marks
- Student: Read-only access to academic data

### 3. Repository Pattern
- Each entity has dedicated data access methods
- Centralized data management through models
- Consistent CRUD operations across entities

## Class Responsibilities

### User Classes
- **Authentication**: Login/logout functionality
- **Profile Management**: Update personal information
- **Security**: Password management

### Admin Class
- **System Administration**: Full entity management
- **User Management**: Create, update, delete users
- **Content Management**: Oversee all system content

### Faculty Class
- **Teaching**: Upload study materials
- **Assessment**: Enter and update student marks
- **Information Access**: View student details and schedules

### Student Class
- **Learning**: Access study materials and marks
- **Information**: View notices and timetables
- **Academic Tracking**: Monitor performance

### Supporting Classes
- **Data Storage**: Represent database entities
- **Business Logic**: Implement domain-specific operations
- **Relationships**: Maintain referential integrity