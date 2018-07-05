<?php

  require('./conector.php');

  $con = new ConectorBD('localhost','CalendarDBA','09PQ37nUVafQJhcK');
  $response['conexion'] = $con->initConexion('calendarproject');

  if ($response['conexion']=='OK') {
    $resultado_consulta = $con->consultar(['users'],
    ['email', 'password'], 'WHERE email="'.$_POST['username'].'"');

    if ($resultado_consulta->num_rows != 0) {
      $fila = $resultado_consulta->fetch_assoc();
      if (password_verify($_POST['password'], $fila['password'])) {
        $response['acceso'] = 'concedido';
        session_start();
        $_SESSION['username']=$fila['email'];
      }else {
        $response['motivo'] = 'Contraseña incorrecta';
        $response['acceso'] = 'rechazado';
      }
    }else{
      $response['motivo'] = 'Email incorrecto';
      $response['acceso'] = 'rechazado';
    }
  }

  echo json_encode($response);

  $con->cerrarConexion();



 ?>
