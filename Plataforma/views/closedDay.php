<?php
    include_once '../site/menu.php';
    include_once '../handlers/closedDayHandler.php';
?>
        <aside class="backend-aside">
            <h3>Dias fechados</h3>
            <a href="createClosedDay.php" class="btn btn-success"><span class="glyphicon glyphicon-plus"></span> Criar dia fechado</a>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Descrição</th>
                        <th scope="col">Data</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        foreach ($result as $closedDay) {
                    ?>
                    <tr>
                        <td><?= $closedDay->description ?></td>
                        <td><?= date_format(date_create($closedDay->date), 'd/m/Y') ?></td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
        </aside>
    </section>
</body>
</html>