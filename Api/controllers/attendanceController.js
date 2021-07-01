module.exports = (app) => {
    let query, result;
    
    const getAllAttendances = async (req, res) => {
        try {
            query = "Select attendances.attendanceId, employees.employeeId, employees.name, attendances.dateAttendance, typesAttendances.description as 'typeAttendance' from attendances inner join typesAttendances on attendances.typeAttendanceId = typesAttendances.typeAttendanceId inner join employees on attendances.employeeId = employees.employeeId inner join entitys on entitys.entityId = employees.entityId where entitys.entityId = ? order by attendances.dateAttendance desc"
            result = await app.config.connectionDB(query, [req.user.entityId]);

            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };
    
    const getAttendances = async (req, res) => {
        try {
            query = "Select attendances.attendanceId, attendances.dateAttendance, typesAttendances.description as 'typeAttendance' from attendances inner join typesAttendances on attendances.typeAttendanceId = typesAttendances.typeAttendanceId where attendances.employeeId = ? order by attendances.dateAttendance desc";
            result = await app.config.connectionDB(query, [req.user.employeeId]);

            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const getDateAttendances = async (req, res) => {
        try {            
            query = "Select attendances.attendanceId, attendances.dateAttendance, typesAttendances.description as 'typeAttendance' from attendances inner join typesAttendances on attendances.typeAttendanceId = typesAttendances.typeAttendanceId where attendances.dateAttendance >= ? And attendances.dateAttendance <= ? And attendances.employeeId = ? order by attendances.dateAttendance desc"; 
            result = await app.config.connectionDB(query, [req.query.initialDate, req.query.finalDate, req.user.employeeId]);
        
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const getLastAttendance = async (req, res) => {
        try {
            query = "Select attendances.attendanceId, attendances.dateAttendance, typesAttendances.description as 'typeAttendance' from attendances inner join typesAttendances on attendances.typeAttendanceId = typesAttendances.typeAttendanceId where attendances.employeeId = ? order by attendances.dateAttendance desc limit 1";
            result = await app.config.connectionDB(query, [req.user.employeeId]);

            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const postAttendance = async (req, res) => {
        try {

            query = "Select typeAttendanceId from attendances where employeeId = ? order by dateAttendance desc Limit 1";
            result = await app.config.connectionDB(query, [req.user.employeeId]);
            let nextTypeAttendanceId;

            if (result.length > 0 && result[0].typeAttendanceId === 1) {
                nextTypeAttendanceId = 2;
            } else {
                nextTypeAttendanceId = 1;
            }

            query = "Insert into attendances (employeeId, dateAttendance, typeAttendanceId) values (?, ?, ?)";
            await app.config.connectionDB(query, [req.user.employeeId, new Date(), nextTypeAttendanceId]);
            
            return res.status(201).send(`${nextTypeAttendanceId === 1 ? "Entrada" : "Saída"} registada com sucesso!`);
                       
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    return { getAllAttendances, getAttendances, getDateAttendances, getLastAttendance, postAttendance }
};