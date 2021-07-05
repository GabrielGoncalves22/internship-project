<?php
    include_once '../site/menu.php';
    include_once '../handlers/scheduleHandler.php';
?>
        <aside class="backend-aside">
            <h3>Horários</h3>
            <table class="table"> 
                <thead>
                    <tr>
                        <th scope="col">Funcionário</th>
                        <th scope="col">Pausa para Almoço</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Horário</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        foreach ($result as $schedule) {
                    ?>
                    <tr>
                        <td><?= $schedule->employeeId . ' - '  . $schedule->name?></td>
                        <td><?= $schedule->lunchBreak === 1 ? 'Sim' : 'Não' ?></td>
                        <td><?= $schedule->description ?></td>
                        <td><?= $schedule->startTime . ' - ' . $schedule->endTime ?></td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
        </aside>
    </section>
</body>
</html>