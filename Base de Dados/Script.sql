Create database AttendanceRegister;

Use AttendanceRegister;

Create table User (
UserId int auto_increment primary key,
Description varchar(255),
Email varchar(100) unique not null,
Password varchar(255) not null,
CreationDate datetime not null,
Permission bit default 0 not null,
State bit default 1 not null
);

Create table Entity (
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

Create table Employee (
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
foreign key (EntityId) references Entity (EntityId),
foreign key (UserId) references User (UserId)
);

Create table TypeAttendance (
TypeAttendanceId int auto_increment primary key,
Description varchar(25) not null
);

Create table Attendance (
AttendanceId int auto_increment primary key,
EmployeeId int not null,
DateAttendance datetime not null,
TypeAttendanceId int not null,
foreign key (EmployeeId) references Employee (EmployeeId),
foreign key (TypeAttendanceId) references TypeAttendance (TypeAttendanceId)
);

Create table ClosedDay (
ClosedDayId int auto_increment primary key,
EntityId int not null,
Description varchar(255),
Date date not null,
foreign key (EntityId) references Entity (EntityId)
);

Create table OffDay (
OffDayId int auto_increment primary key,
EmployeeId int not null,
Description varchar(255),
Date date not null,
foreign key (EmployeeId) references Employee (EmployeeId)
);

Create table Schedule (
ScheduleId int auto_increment primary key,
EntityId int not null,
Description varchar(255),
LunchBreak bit not null,
NormalHours int not null,
foreign key (EntityId) references Entity (EntityId)
);

Create table DetailsSchedule (
DetailsScheduleId int auto_increment primary key,
ScheduleId int not null,
Description varchar(255),
StartTime time not null,
EndTime time not null,
foreign key (ScheduleId) references Schedule (ScheduleId)
);

Create table EmployeeSchedule (
ScheduleId int not null,
EmployeeId int not null,
primary key (ScheduleId, EmployeeId),
foreign key (ScheduleId) references Schedule (ScheduleId),
foreign key (EmployeeId) references Employee (EmployeeId)
);

Insert into TypeAttendance (Description) values 
("Entrada"),
("Saída");