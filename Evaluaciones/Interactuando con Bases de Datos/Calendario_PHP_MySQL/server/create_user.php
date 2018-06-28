<?php
  include('conector.php');

  $data1['email'] = "'juan.gomez@gmail.com'";
  $data1['fullname'] = "'juan gomez'";
  $data1['password'] = "'".password_hash('pass1', PASSWORD_DEFAULT)."'";
  $data1['birthday'] = "'1991-3-12'";

  $data2['email'] = "'paco.perez@gmail.com'";
  $data2['fullname'] = "'francisco perez'";
  $data2['password'] = "'".password_hash('pass2', PASSWORD_DEFAULT)."'";
  $data2['birthday'] = "'1990-9-14'";

  $data3['email'] = "'jose.beltran@gmail.com'";
  $data3['fullname'] = "'jose beltran'";
  $data3['password'] = "'".password_hash('pass3', PASSWORD_DEFAULT)."'";
  $data3['birthday'] = "'1991-03-07'";

  $con = new ConectorBD('localhost','CalendarDBA','09PQ37nUVafQJhcK');
  $response['conexion'] = $con->initConexion('calendarproject');

  if ($response['conexion']=='OK') {
    if($con->insertData('users', $data1)){
      $response['msg']="exito en la inserción";
    }else {
      $response['msg']= "Hubo un error y los datos no han sido cargados";
    }
    if($con->insertData('users', $data2)){
      $response['msg']="exito en la inserción";
    }else {
      $response['msg']= "Hubo un error y los datos no han sido cargados";
    }
    if($con->insertData('users', $data3)){
      $response['msg']="exito en la inserción";
    }else {
      $response['msg']= "Hubo un error y los datos no han sido cargados";
    }
  }else {
    $response['msg']= "No se pudo conectar a la base de datos";
  }

  echo json_encode($response);
 ?>
