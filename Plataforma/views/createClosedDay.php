<?php
    include_once "../site/menu.php";
?>
        <aside class="backend-aside">
            <h3>Criar dia fechado</h3>
            <form id="form-create-closedDay" enctype="multipart/form-data" method="POST">
                <div class="form-group">
                    <label>Descrição: </label>
                    <input type="text" class="form-control" id="closedDayDescription" name="closedDayDescription">
                </div>
                <div class="form-group">
                    <label>Data: * </label>
                    <input type="date" class="form-control" id="closedDayDate" name="closedDayDate">
                </div>
                <div class="form-group">
                    <p class="alert" role="alert"></p>
                </div>
                <div class="form-group">
                    <input type="submit" class="btn btn-primary" value="Submeter"/>
                    <a href="closedDay.php" class="btn btn-danger">Cancelar</a>
                </div> 
            </form>
        </aside>
    </section>
</body>
</html>