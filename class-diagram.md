# Class Diagram for College Management System

## Classes and Relationships

### Main Classes:

#### 1. User (Abstract Base Class)
```
User
├── Attributes:
│   ├── firstName: String
│   ├── lastName: String
│   ├── email: String
│   ├── phone: String
│   ├── profile: String
│   ├── address: String
│   ├── city: String
│   ├── state: String
│   ├── pincode: String
│   ├── country: String
│   ├── gender: String (enum: male/female/other)
│   ├── dob: Date
│   ├── status: String (enum: active/inactive)
│   ├── bloodGroup: String
│   ├── emergencyContact: Object
│   │   ├── name: String
│   │   ├── relationship: String
│   │   └── phone: String
│   └── password: String
├── Methods:
│   ├── login(): boolean
│   ├── logout(): void
│   ├── updateProfile(): void
│   └── changePassword(): void
```

#### 2. Admin (extends User)
```
Admin
├── Attributes: (inherits from User)
│   ├── employeeId: Number
│   ├── designation: String
│   ├── joiningDate: Date
│   ├── salary: Number
│   └── isSuperAdmin: Boolean
├── Methods:
│   ├── manageStudents(): void
│   ├── manageFaculty(): void
│   ├── manageBranches(): void
│   ├── manageSubjects(): void
│   ├── manageExams(): void
│   ├── manageNotices(): void
│   ├── manageTimetables(): void
│   ├── manageMaterials(): void
│   └── manageMarks(): void
```

#### 3. Faculty (extends User)
```
Faculty
├── Attributes: (inherits from User)
│   ├── employeeId: Number
│   ├── designation: String
│   ├── joiningDate: Date
│   ├── salary: Number
│   └── branchId: ObjectId (ref: Branch)
├── Methods:
│   ├── uploadMaterial(): void
│   ├── addMarks(): void
│   ├── viewStudents(): void
│   ├── viewTimetable(): void
│   └── viewNotices(): void
```

#### 4. Student (extends User)
```
Student
├── Attributes: (inherits from User)
│   ├── enrollmentNo: Number
│   ├── middleName: String
│   ├── semester: Number
│   └── branchId: ObjectId (ref: Branch)
├── Methods:
│   ├── viewMarks(): void
│   ├── viewMaterials(): void
│   ├── viewTimetable(): void
│   └── viewNotices(): void
```

#### 5. Branch
```
Branch
├── Attributes:
│   ├── branchId: String
│   └── name: String
├── Methods:
│   ├── getStudents(): Array<Student>
│   ├── getFaculty(): Array<Faculty>
│   ├── getSubjects(): Array<Subject>
│   └── getTimetable(): Timetable
```

#### 6. Subject
```
Subject
├── Attributes:
│   ├── name: String
│   ├── code: String
│   ├── branch: ObjectId (ref: Branch)
│   ├── semester: Number
│   └── credits: Number
├── Methods:
│   ├── getMaterials(): Array<Material>
│   └── getMarks(): Array<Marks>
```

#### 7. Exam
```
Exam
├── Attributes:
│   ├── name: String
│   ├── date: Date
│   ├── semester: Number
│   ├── examType: String (enum: mid/end)
│   ├── timetableLink: String
│   └── totalMarks: Number
├── Methods:
│   └── getMarks(): Array<Marks>
```

#### 8. Marks
```
Marks
├── Attributes:
│   ├── studentId: ObjectId (ref: StudentDetails)
│   ├── subjectId: ObjectId (ref: Subject)
│   ├── marksObtained: Number
│   ├── semester: Number
│   └── examId: ObjectId (ref: Exam)
├── Methods:
│   └── calculateGrade(): String
```

#### 9. Material
```
Material
├── Attributes:
│   ├── title: String
│   ├── subject: ObjectId (ref: Subject)
│   ├── faculty: ObjectId (ref: FacultyDetails)
│   ├── file: String
│   ├── semester: Number
│   ├── branch: ObjectId (ref: Branch)
│   └── type: String (enum: notes/assignment/syllabus/other)
├── Methods:
│   ├── download(): void
│   └── view(): void
```

#### 10. Notice
```
Notice
├── Attributes:
│   ├── title: String
│   ├── description: String
│   ├── type: String (enum: student/faculty/both)
│   ├── link: String
│   └── createdAt: Date
├── Methods:
│   └── broadcast(): void
```

#### 11. Timetable
```
Timetable
├── Attributes:
│   ├── link: String
│   ├── branch: ObjectId (ref: Branch)
│   └── semester: Number
├── Methods:
│   └── view(): void
```

## Class Relationships:

### Inheritance:
- `Admin` extends `User`
- `Faculty` extends `User`
- `Student` extends `User`

### Associations:

#### Admin Associations:
- `Admin` -- manages --> `Student` (1:N)
- `Admin` -- manages --> `Faculty` (1:N)
- `Admin` -- manages --> `Branch` (1:N)
- `Admin` -- manages --> `Subject` (1:N)
- `Admin` -- manages --> `Exam` (1:N)
- `Admin` -- manages --> `Notice` (1:N)
- `Admin` -- manages --> `Timetable` (1:N)
- `Admin` -- manages --> `Material` (1:N)
- `Admin` -- manages --> `Marks` (1:N)

#### Faculty Associations:
- `Faculty` -- belongs to --> `Branch` (N:1)
- `Faculty` -- uploads --> `Material` (1:N)
- `Faculty` -- assigns --> `Marks` (1:N)

#### Student Associations:
- `Student` -- belongs to --> `Branch` (N:1)
- `Student` -- receives --> `Marks` (1:N)
- `Student` -- accesses --> `Material` (N:N)
- `Student` -- views --> `Notice` (N:N)
- `Student` -- views --> `Timetable` (N:1)

#### Branch Associations:
- `Branch` -- contains --> `Student` (1:N)
- `Branch` -- contains --> `Faculty` (1:N)
- `Branch` -- contains --> `Subject` (1:N)
- `Branch` -- has --> `Timetable` (1:N)
- `Branch` -- has --> `Material` (1:N)

#### Subject Associations:
- `Subject` -- belongs to --> `Branch` (N:1)
- `Subject` -- has --> `Material` (1:N)
- `Subject` -- has --> `Marks` (1:N)

#### Exam Associations:
- `Exam` -- has --> `Marks` (1:N)

#### Material Associations:
- `Material` -- belongs to --> `Subject` (N:1)
- `Material` -- uploaded by --> `Faculty` (N:1)
- `Material` -- belongs to --> `Branch` (N:1)

#### Notice Associations:
- `Notice` -- viewed by --> `Student` (N:N)
- `Notice` -- viewed by --> `Faculty` (N:N)

#### Timetable Associations:
- `Timetable` -- belongs to --> `Branch` (N:1)
- `Timetable` -- viewed by --> `Student` (1:N)
- `Timetable` -- viewed by --> `Faculty` (1:N)

#### Marks Associations:
- `Marks` -- belongs to --> `Student` (N:1)
- `Marks` -- belongs to --> `Subject` (N:1)
- `Marks` -- belongs to --> `Exam` (N:1)

## Class Diagram Representation:

```
[User] <|-- [Admin]
[User] <|-- [Faculty]
[User] <|-- [Student]

[Admin] --> [Student] : manages
[Admin] --> [Faculty] : manages
[Admin] --> [Branch] : manages
[Admin] --> [Subject] : manages
[Admin] --> [Exam] : manages
[Admin] --> [Notice] : manages
[Admin] --> [Timetable] : manages
[Admin] --> [Material] : manages
[Admin] --> [Marks] : manages

[Faculty] --> [Branch] : belongs to
[Faculty] --> [Material] : uploads
[Faculty] --> [Marks] : assigns

[Student] --> [Branch] : belongs to
[Student] --> [Marks] : receives
[Student] --> [Material] : accesses
[Student] --> [Notice] : views
[Student] --> [Timetable] : views

[Branch] --> [Student] : contains
[Branch] --> [Faculty] : contains
[Branch] --> [Subject] : contains
[Branch] --> [Timetable] : has
[Branch] --> [Material] : has

[Subject] --> [Branch] : belongs to
[Subject] --> [Material] : has
[Subject] --> [Marks] : has

[Exam] --> [Marks] : has

[Material] --> [Subject] : belongs to
[Material] --> [Faculty] : uploaded by
[Material] --> [Branch] : belongs to

[Notice] --> [Student] : viewed by
[Notice] --> [Faculty] : viewed by

[Timetable] --> [Branch] : belongs to
[Timetable] --> [Student] : viewed by
[Timetable] --> [Faculty] : viewed by

[Marks] --> [Student] : belongs to
[Marks] --> [Subject] : belongs to
[Marks] --> [Exam] : belongs to