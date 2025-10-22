# Use Case Diagram for College Management System

## Actors:

1. **Admin** - System administrator with full access
2. **Faculty** - Teaching staff
3. **Student** - Students enrolled in the college

## Use Cases:

### Admin Use Cases:

#### User Management:
- **Login to System**
- **Logout from System**
- **View Profile**
- **Update Profile**
- **Change Password**

#### Student Management:
- **Add Student**
- **View Students**
- **Update Student Details**
- **Delete Student**
- **Activate/Deactivate Student**

#### Faculty Management:
- **Add Faculty**
- **View Faculty**
- **Update Faculty Details**
- **Delete Faculty**
- **Activate/Deactivate Faculty**

#### Branch Management:
- **Add Branch**
- **View Branches**
- **Update Branch**
- **Delete Branch**

#### Subject Management:
- **Add Subject**
- **View Subjects**
- **Update Subject**
- **Delete Subject**

#### Exam Management:
- **Create Exam**
- **View Exams**
- **Update Exam Details**
- **Delete Exam**

#### Notice Management:
- **Create Notice**
- **View Notices**
- **Update Notice**
- **Delete Notice**

#### Timetable Management:
- **Upload Timetable**
- **View Timetables**
- **Update Timetable**
- **Delete Timetable**

#### Material Management:
- **View All Materials**
- **Delete Material**

#### Marks Management:
- **View All Marks**
- **Update Marks**

### Faculty Use Cases:

#### Authentication:
- **Login to System**
- **Logout from System**
- **View Profile**
- **Update Profile**
- **Change Password**

#### Teaching Activities:
- **Upload Material**
- **View Uploaded Materials**
- **Update Material**
- **Delete Material**

#### Assessment:
- **Add Marks**
- **View Marks**
- **Update Marks**

#### Information Access:
- **View Timetable**
- **View Notices**
- **Search Students**
- **View Student Details**
- **View Exams**

### Student Use Cases:

#### Authentication:
- **Login to System**
- **Logout from System**
- **View Profile**
- **Update Profile**
- **Change Password**

#### Academic Activities:
- **View Marks**
- **View Materials**
- **Download Materials**

#### Information Access:
- **View Timetable**
- **View Notices**
- **View Exams**

## Use Case Diagram Representation:

```
┌─────────────────────────────────────────────────────────────────┐
│                    College Management System                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────────────────────────────┐     │
│  │    Admin    │    │           Use Cases                 │     │
│  └─────────────┘    └─────────────────────────────────────┤     │
│          │                      │                         │     │
│          │                      │                         │     │
│          │  ┌───────────────────┼─────────────────────┐   │     │
│          │  │                   │                     │   │     │
│          │  │  User Management  │  Student Management │   │     │
│          │  │                   │                     │   │     │
│          │  │ • Login/Logout    │ • Add/View/Update   │   │     │
│          │  │ • View Profile    │ • Delete Student    │   │     │
│          │  │ • Update Profile  │ • Activate/Deactivate│   │     │
│          │  │ • Change Password │                     │   │     │
│          │  └───────────────────┼─────────────────────┘   │     │
│          │                      │                         │     │
│          │  ┌───────────────────┼─────────────────────┐   │     │
│          │  │                   │                     │   │     │
│          │  │ Faculty Management│  Branch Management │   │     │
│          │  │                   │                     │   │     │
│          │  │ • Add/View/Update │ • Add/View/Update  │   │     │
│          │  │ • Delete Faculty  │ • Delete Branch    │   │     │
│          │  │ • Activate/Deactivate│                   │   │     │
│          │  └───────────────────┼─────────────────────┘   │     │
│          │                      │                         │     │
│          │  ┌───────────────────┼─────────────────────┐   │     │
│          │  │                   │                     │   │     │
│          │  │ Subject Management│  Exam Management   │   │     │
│          │  │                   │                     │   │     │
│          │  │ • Add/View/Update │ • Create/View/Update│   │     │
│          │  │ • Delete Subject  │ • Delete Exam      │   │     │
│          │  └───────────────────┼─────────────────────┘   │     │
│          │                      │                         │     │
│          │  ┌───────────────────┼─────────────────────┐   │     │
│          │  │                   │                     │   │     │
│          │  │ Notice Management │ Timetable Management│   │     │
│          │  │                   │                     │   │     │
│          │  │ • Create/View/Update│ • Upload/View/Update│   │     │
│          │  │ • Delete Notice   │ • Delete Timetable │   │     │
│          │  └───────────────────┼─────────────────────┘   │     │
│          │                      │                         │     │
│          │  ┌───────────────────┼─────────────────────┐   │     │
│          │  │                   │                     │   │     │
│          │  │ Material Management│ Marks Management  │   │     │
│          │  │                   │                     │   │     │
│          │  │ • View All        │ • View All Marks   │   │     │
│          │  │ • Delete Material │ • Update Marks     │   │     │
│          │  └───────────────────┴─────────────────────┘   │     │
│          │                                                │     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────────────────────────────┐     │
│  │   Faculty   │    │           Use Cases                 │     │
│  └─────────────┘    └─────────────────────────────────────┤     │
│          │                      │                         │     │
│          │                      │                         │     │
│          │  ┌───────────────────┼─────────────────────┐   │     │
│          │  │                   │                     │   │     │
│          │  │ Authentication    │ Teaching Activities│   │     │
│          │  │                   │                     │   │     │
│          │  │ • Login/Logout    │ • Upload Material   │   │     │
│          │  │ • View/Update     │ • View/Update/Delete│   │     │
│          │  │ • Profile         │ • Material          │   │     │
│          │  │ • Change Password │                     │   │     │
│          │  └───────────────────┼─────────────────────┘   │     │
│          │                      │                         │     │
│          │  ┌───────────────────┼─────────────────────┐   │     │
│          │  │                   │                     │   │     │
│          │  │   Assessment      │ Information Access │   │     │
│          │  │                   │                     │   │     │
│          │  │ • Add/View/Update │ • View Timetable   │   │     │
│          │  │ • Marks           │ • View Notices     │   │     │
│          │  │                   │ • Search Students  │   │     │
│          │  │                   │ • View Exams       │   │     │
│          │  └───────────────────┴─────────────────────┘   │     │
│          │                                                │     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────────────────────────────┐     │
│  │   Student   │    │           Use Cases                 │     │
│  └─────────────┘    └─────────────────────────────────────┤     │
│          │                      │                         │     │
│          │                      │                         │     │
│          │  ┌───────────────────┼─────────────────────┐   │     │
│          │  │                   │                     │   │     │
│          │  │ Authentication    │ Academic Activities│   │     │
│          │  │                   │                     │   │     │
│          │  │ • Login/Logout    │ • View Marks        │   │     │
│          │  │ • View/Update     │ • View Materials    │   │     │
│          │  │ • Profile         │ • Download Materials│   │     │
│          │  │ • Change Password │                     │   │     │
│          │  └───────────────────┼─────────────────────┘   │     │
│          │                      │                         │     │
│          │  ┌───────────────────┴─────────────────────┐   │     │
│          │  │                                         │   │     │
│          │  │         Information Access              │   │     │
│          │  │                                         │   │     │
│          │  │ • View Timetable                        │   │     │
│          │  │ • View Notices                          │   │     │
│          │  │ • View Exams                            │   │     │
│          │  └─────────────────────────────────────────┘   │     │
│          │                                                │     │
└─────────────────────────────────────────────────────────────────┘
```

## Detailed Use Case Descriptions:

### Admin - Login to System
- **Actor:** Admin
- **Preconditions:** Admin has valid credentials
- **Main Flow:**
  1. Admin enters username and password
  2. System validates credentials
  3. Admin is logged in and redirected to dashboard
- **Postconditions:** Admin has access to all system features

### Faculty - Upload Material
- **Actor:** Faculty
- **Preconditions:** Faculty is logged in
- **Main Flow:**
  1. Faculty selects "Upload Material"
  2. Chooses subject, type, and file
  3. Uploads material
  4. System stores material and associates with faculty/subject
- **Postconditions:** Material is available to students

### Student - View Marks
- **Actor:** Student
- **Preconditions:** Student is logged in
- **Main Flow:**
  1. Student selects "View Marks"
  2. System retrieves marks for the student
  3. Marks are displayed
- **Postconditions:** Student can see their academic performance

## System Boundaries:

- **Authentication System:** Handles login/logout for all users
- **User Management System:** Admin manages users
- **Academic Management System:** Handles subjects, exams, marks
- **Content Management System:** Handles materials, notices, timetables
- **Reporting System:** Generates reports for admin/faculty