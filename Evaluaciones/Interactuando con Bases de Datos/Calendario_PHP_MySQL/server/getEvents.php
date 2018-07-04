<?php

  require('./conector.php');

  session_start();

  if (isset($_SESSION['username'])) {
    $con = new ConectorBD('localhost', 'CalendarDBA', '09PQ37nUVafQJhcK');
    if ($con->initConexion('calendarproject')=='OK') {
      $resultado = $con->consultar(['events'], ['*'], "WHERE email ='" .$_SESSION['username']."'");
      $i=0;
      while ($fila = $resultado->fetch_assoc()) {
        $response['events'][$i]['id'] = $fila['id'];
        $response['events'][$i]['title'] = $fila['title'];
        $response['events'][$i]['start'] = $fila['startdate'].' '.$fila['starthour'];
        $response['events'][$i]['end'] = $fila['enddate'].' '.$fila['endhour'];
        $response['events'][$i]['allDay'] = boolval($fila['is_full_day']);
        $response['events'][$i]['email'] = $fila['email'];
        $i++;
      }
      $response['session'] = $_SESSION['username'];
      $response['msg']= 'OK';
    }else {
      $response['msg']= 'No se pudo conectar a la base de datos';
    }
  }else {
    $response['msg']= 'No se ha iniciado una sesión';
  }

  echo json_encode($response);


 ?>
