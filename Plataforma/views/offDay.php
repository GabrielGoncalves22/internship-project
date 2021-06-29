<?php
    include_once '../site/menu.php';
    include_once '../handlers/offDayHandler.php';
?>
        <aside class="backend-aside">
            <h3>Dias de folga</h3>
            <a href="createOffDay.php" class="btn btn-success"><span class="glyphicon glyphicon-plus"></span> Criar dia de folga</a>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Funcionário</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Data</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        foreach ($result as $offDay) {
                    ?>
                    <tr>
                        <td><?= $offDay->infoEmployee ?></td>
                        <td><?= $offDay->description ?></td>
                        <td><?= date_format(date_create($offDay->date), 'd/m/Y') ?></td>
                    </tr>
                    <?php } ?>
                </body>
            </table>
        </aside>
    </section>
</body>
</html>