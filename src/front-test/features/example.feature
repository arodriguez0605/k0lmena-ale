@LetCodeForm @Smoke @formulario @positivo
Feature: Letcode form
Scenario: Formulario carga correctamente
  Given El usuario ingresa al link del formulario
  Then El sistema carga el formulario correctamente

@LetCodeForm @Smoke @registro @negativo
Scenario Outline: Registro exitoso con todos los campos validos
  Given El usuario está en la pagina del formulario
  When El usuario ingresa "<firstName>" en el campo First Name
   And El usuario ingresa "<lastName>" en el campo Last Name
   And El usuario ingresa "<email>" en el campo Email
   And El usuario selecciona "<countryCode>" en el campo Country code
   And El usuario ingresa "<phone>" en el campo Phone Number
   And El usuario ingresa "<address1>" en el campo Address Line-1
   And El usuario ingresa "<address2>" en el campo Address Line-2
   And El usuario ingresa "<state>" en el campo State
   And El usuario ingresa "<postal>" en el campo Postal-Code
   And El usuario selecciona "<country>" en el campo Country
   And El usuario ingresa "<dob>" en el campo Date Of Birth
   And El usuario selecciona "<gender>" en el campo Gender
   And El usuario marca la casilla de términos y condiciones
   And El usuario hace clic en Submit
  Then El sistema envia el formulario correctamente

  Examples:
    | firstName | lastName | email             | countryCode | phone      | address1      | address2      | state   | postal  | country        | dob        | gender | 
    | Gabriela  | Aguilar  | gab@mail.com      | UK (+44)    | 9876543210 | Main Street 5 | Street 12     |NY       | 10001   | United Kingdom | 01/01/1995 | Female | 
    | Victor    | Perez    | victor@test.com   | USA (+1)    | 0123456789 | Av. Central   | Central 15    |CA       | 90210   | United States  | 15/06/1990 | Male   |


 @LetCodeForm @Smoke @registro @negativo
Scenario Outline: Registro fallido por nombre vacío
  Given El usuario ingresa en la pagina del formulario
  When El usuario ingresa "<firstName>" incorrectamente en el campo First Name
   And El usuario hace clic en Submit para enviar la información
  Then El sistema muestra un mensaje de error indicando que el nombre no es válido

  Examples:
    | firstName | lastName | email          | countryCode | phone      | address1      | address2      | state   | postal  | country        | dob        | gender | 
    |           | Aguilar  | gab@mail.com   | UK (+44)    | 9876543210 | Main Street 5 | Street 12     |NY       | 10001   | United Kingdom | 01/01/1995 | Female | 
    
    
  @LetCodeForm @Smoke @registro @negativo
Scenario Outline: Registro fallido por formato inválido en el campo Phone
  Given El usuario está en la pagina del formulario con los campos llenos
  When El usuario ingresa el "<firstName>" en el campo First Name
   And El usuario ingresa el "<lastName>" en el campo Last Name
   And El usuario ingresa el "<email>" en el campo Email
   And El usuario selecciona el "<countryCode>" en el campo Country code
   And El usuario ingresa letras en "<phone>" en el campo Phone Number
   And El usuario hace clic en Submit para enviar la información con el formato de Phone incorrecto
  Then El sistema muestra un mensaje de error indicando que el formato de Phone no es válido

  Examples:
    | firstName | lastName | email          | countryCode | phone      | address1      | address2      | state   | postal  | country        | dob        | gender | 
    | Gabriela  | Aguilar  | gab@mail.com   | UK (+44)    | abc        | Main Street 5 | Street 12     |NY       | 10001   | United Kingdom | 01/01/1995 | Female | 
    
@LetCodeForm @Smoke @registro @negativo
Scenario Outline: Registro fallido por no aceptar terminos y condiciones
  Given El usuario llena todos los campos pero no acepta terminos y condiciones
  When El usuario ingresa "<firstName>" en el campo del First Name
   And El usuario ingresa "<lastName>" en el campo del Last Name
   And El usuario ingresa "<email>" en el campo del Email
   And El usuario selecciona "<countryCode>" en el campo del Country code
   And El usuario ingresa "<phone>" en el campo del Phone Number
   And El usuario ingresa "<address1>" en el campo del Address Line-1
   And El usuario ingresa "<address2>" en el campo del Address Line-2
   And El usuario ingresa "<state>" en el campo del State
   And El usuario ingresa "<postal>" en el campo del Postal-Code
   And El usuario selecciona "<country>" en el campo del Country
   And El usuario ingresa "<dob>" en el campo del Date Of Birth
   And El usuario selecciona "<gender>" en el campo del Gender
   And El usuario no marca la casilla de términos y condiciones
   And El usuario hace clic en Submit para enviar la información sin aceptar los terminos y condiciones
  Then El sistema muestra un mensaje de error indicando que el debes dar check para continuar

  Examples:
    | firstName | lastName | email             | countryCode | phone      | address1      | address2      | state   | postal  | country        | dob        | gender | 
    | Gabriela  | Aguilar  | gab@mail.com      | UK (+44)    | 9876543210 | Main Street 5 | Street 12     |NY       | 10001   | United Kingdom | 01/01/1995 | Female | 
    | Victor    | Perez    | victor@test.com   | USA (+1)    | 0123456789 | Av. Central   | Central 15    |CA       | 90210   | United States  | 15/06/1990 | Male   |
