<?php
  require('./conector.php');

  session_start();

  if (isset($_SESSION['username'])) {
    $con = new ConectorBD('localhost', 'CalendarDBA', '09PQ37nUVafQJhcK');
    if ($con->initConexion('calendarproject')=='OK') {

      if ($con->eliminarRegistro('events', "id = ".$_POST['id'])) {
        $response['msg']= 'OK';
      }else {
        $response['msg']= 'No se pudo realizar la eliminacion de los datos';
      }
    }else {
      $response['msg']= 'No se pudo conectar a la base de datos';
    }
  }else {
    $response['msg']= 'No se ha iniciado una sesión';
  }

  echo json_encode($response);


 ?>
