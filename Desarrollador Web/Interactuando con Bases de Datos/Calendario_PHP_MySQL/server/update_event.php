<?php
  require('./conector.php');

  session_start();

  if (isset($_SESSION['username'])) {
    $con = new ConectorBD('localhost', 'CalendarDBA', '09PQ37nUVafQJhcK');
    if ($con->initConexion('calendarproject')=='OK') {

      $data['startdate'] = "'".$_POST['start_date']."'";
      $data['starthour'] = "'".$_POST['start_hour']."'";
      $data['enddate'] = "'".$_POST['end_date']."'";
      $data['endhour'] = "'".$_POST['end_hour']."'";

      if ($con->actualizarRegistro('events', $data, "id = ".$_POST['id'])) {
        $response['msg']= 'OK';
      }else {
        $response['msg']= 'No se pudo realizar la actualizacion de los datos';
      }
    }else {
      $response['msg']= 'No se pudo conectar a la base de datos';
    }
  }else {
    $response['msg']= 'No se ha iniciado una sesión';
  }

  echo json_encode($response);


 ?>
