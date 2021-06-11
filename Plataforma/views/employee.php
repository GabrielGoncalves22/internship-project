<?php
    include_once '../site/menu.php';
    include_once '../handlers/employeeHandler.php';
?>
        <aside class="backend-aside">
            <table class="table"> 
                <thead>
                <tr>
                    <th scope="col">Id Funcionário</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Morada</th>
                    <th scope="col">Código-Postal</th>
                    <th scope="col">Localidade</th>
                    <th scope="col">Número de Telemóvel</th>
                    <th scope="col">Email</th>
                </tr>
                </thead>
                <tbody>
                    <?php
                        foreach ($result as $employee) {
                    ?>
                    <tr>
                        <td><?= $employee->employeeId ?></td>
                        <td><?= $employee->name ?></td>
                        <td><?= $employee->address ?></td>
                        <td><?= $employee->postalCode ?></td>
                        <td><?= $employee->locality ?></td>
                        <td><?= $employee->mobilePhone ?></td>
                        <td><?= $employee->email ?></td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
        </aside>
    </section>
</body>
</html>