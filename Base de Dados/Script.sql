Create database AttendanceRegister;

Use AttendanceRegister;

Create table Users (
UserId int auto_increment primary key,
Description varchar(255),
Email varchar(100) unique not null,
Password varchar(255) not null,
CreationDate datetime not null,
Permission boolean default 0 not null,
State boolean default 1 not null
);

Create table Entitys (
EntityId int auto_increment primary key,
Name varchar(100) not null,
Address varchar(100) not null,
Address2 varchar(100),
PostalCode varchar(25) not null,
Locality varchar(50) not null,
Telephone varchar(20) not null,
Fax varchar(20),
Email varchar(100) not null
);

Create table Employees (
EmployeeId int auto_increment primary key,
Name varchar(100) not null,
Address varchar(100) not null,
Address2 varchar(100),
PostalCode varchar(25) not null,
Locality varchar(50) not null,
Telephone varchar(20),
MobilePhone varchar(20) not null,
Grades varchar(255),
EntityId int not null,
UserId int not null,
foreign key (EntityId) references Entitys (EntityId),
foreign key (UserId) references Users (UserId)
);

Create table TypesAttendances (
TypeAttendanceId int auto_increment primary key,
Description varchar(25) not null
);

Create table Attendances (
AttendanceId int auto_increment primary key,
EmployeeId int not null,
DateAttendance datetime not null,
TypeAttendanceId int not null,
foreign key (EmployeeId) references Employees (EmployeeId),
foreign key (TypeAttendanceId) references TypesAttendances (TypeAttendanceId)
);

Create table ClosedDays (
ClosedDayId int auto_increment primary key,
EntityId int not null,
Description varchar(255),
Date date not null,
foreign key (EntityId) references Entitys (EntityId)
);

Create table OffDays (
OffDayId int auto_increment primary key,
EmployeeId int not null,
Description varchar(255),
Date date not null,
foreign key (EmployeeId) references Employees (EmployeeId)
);

Create table Schedules (
ScheduleId int auto_increment primary key,
EntityId int not null,
Description varchar(255),
LunchBreak boolean not null,
NormalHours int not null,
foreign key (EntityId) references Entitys (EntityId)
);

Create table DetailsSchedules (
DetailsScheduleId int auto_increment primary key,
ScheduleId int not null,
Description varchar(255),
StartTime time not null,
EndTime time not null,
foreign key (ScheduleId) references Schedules (ScheduleId)
);

Create table EmployeesSchedules (
ScheduleId int not null,
EmployeeId int not null,
primary key (ScheduleId, EmployeeId),
foreign key (ScheduleId) references Schedules (ScheduleId),
foreign key (EmployeeId) references Employees (EmployeeId)
);

Insert into TypesAttendances (Description) values 
("Entrada"),
("Saída");