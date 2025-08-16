import { expect } from '@playwright/test';
import { Given, When, Then } from '@cucumber/cucumber';
import { BASEURL } from '../config';
import { pages } from '../hooks/hook';
import { validateFirstLocator } from '../utils/validations';
import {
  divResult
} from '../locators/exampleLocators';
import {
  getByPlaceholderAndClickIt,
  getByPlaceholderAndFillIt,
  getElementByRole
} from '../utils/interactions';

//El formulario carga correctamente

Given("El usuario ingresa al link del formulario", async () => {
  for (const page of pages) {
    console.log(`Ejecutando prueba en navegador: ${page.context().browser()?.browserType().name()}`);
    await page.goto(BASEURL);
  }
});

Then('El sistema carga el formulario correctamente', async function () {
  for (const page of pages) {
        // Verificamos que los campos principales estén visibles
        const firstName = page.locator('#firstname');
        const lastName = page.locator('#lasttname');
        const email = page.locator('#email');
        const submitButton = page.locator('input[type="submit"]');
    
        await expect(firstName).toBeVisible();
        await expect(lastName).toBeVisible();
        await expect(email).toBeVisible();
        await expect(submitButton).toBeVisible();
  }
});

//Registro exitoso con todos los campos validos

Given("El usuario está en la pagina del formulario", async () => {
  for (const page of pages) {
    console.log(`Ejecutando prueba en navegador: ${page.context().browser()?.browserType().name()}`);
    await page.goto(BASEURL);
  }
});

When('El usuario ingresa {string} en el campo First Name', async function (firstName: string) {
  for (const page of pages) {
    //await page.fill("#firstName", firstName, { timeout: 60000 });
    await page.fill("#firstname", firstName);
  }
});

When('El usuario ingresa {string} en el campo Last Name', async function (lastname: string) {
  for (const page of pages) {
   // await page.fill("#lastname", lastname, { timeout: 60000 });
    await page.fill("#lasttname", lastname);
  }
});

When('El usuario ingresa {string} en el campo Email', async function (email: string) {
  for (const page of pages) {
    await page.fill("#email", email);
  }
});


When('El usuario selecciona {string} en el campo Country code', async function (countryCode: string) {
   for (const page of pages) {

      // Buscar específicamente el select que está dentro del bloque que contiene "Country code"
      const countrySelect = page.locator('form div', { hasText: 'Country code' }).locator('select');

      // Esperar que esté visible
      await countrySelect.waitFor({ state: 'visible', timeout: 60000 });
  
      // Seleccionar la opción
      await countrySelect.selectOption({ label: countryCode });
  
      // Verificar que la opción quedó seleccionada
      const selected = await countrySelect.locator('option:checked').textContent();
      //console.log(`Seleccionado Country code: ${selected}`);
}
});

When('El usuario ingresa {string} en el campo Phone Number', async function (phone: string) {
  for (const page of pages) {
    await page.fill("#Phno", phone);
  }
});

When('El usuario ingresa {string} en el campo Address Line-1', async function (address1: string) {
  for (const page of pages) {
    await page.fill("#Addl1", address1);
  }
});

When('El usuario ingresa {string} en el campo Address Line-2', async function (address2: string) {
  for (const page of pages) {
    await page.fill("#Addl2", address2);
  }
});

When('El usuario ingresa {string} en el campo State', async function (state: string) {
  for (const page of pages) {
    await page.fill("#state", state);
  }
});

When('El usuario ingresa {string} en el campo Postal-Code', async function (postal: string) {
  for (const page of pages) {
    await page.fill("#postalcode", postal);
  }
});

When('El usuario selecciona {string} en el campo Country', async function (country: string) {
  for (const page of pages) {
    // Buscar el select que está dentro de un div que contiene la palabra "Postal-CodeCountry"
    const countrySelect = page.locator('form div', { hasText: 'Postal-CodeCountry' }).locator('select');

    // Esperar a que el select esté visible y listo para interactuar
    await countrySelect.waitFor({ state: 'visible', timeout: 60000 });

    // Seleccionar la opción por label
    await countrySelect.selectOption({ label: country });

    // Verificar la selección
    const selected = await countrySelect.locator('option:checked').textContent();
    //console.log(`Seleccionado Country: ${selected}`);

  }
});

When('El usuario ingresa {string} en el campo Date Of Birth', async function (dob: string) {
  for (const page of pages) {
       // Convertir dob de formato dd/MM/yyyy a yyyy-MM-dd
       const [day, month, year] = dob.split('/');
       const formattedDate = `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;
   
       // Llenar el input
       await page.fill('#Date', formattedDate);
   
       // Opcional: verificar que se ingresó correctamente
       const value = await page.locator('#Date').inputValue();
       //console.log(`Fecha ingresada: ${value}`);
  }
});

When('El usuario selecciona {string} en el campo Gender', async function (gender: string) {
  for (const page of pages) {
    const genderMap: Record<string, string> = {
      "Male": "male",
      "Female": "female",
      "Transgender": "trans"
    };
  
    for (const page of pages) {
      const genderId = genderMap[gender];
      if (!genderId) throw new Error(`Gender desconocido: ${gender}`);
  
      // Check usando el id
      await page.check(`#${genderId}`);
  
      //console.log(` Gender seleccionado: ${gender}`);
    }}
});

When('El usuario marca la casilla de términos y condiciones', async function () {
  for (const page of pages) {
    await page.locator('label', { hasText: 'I agree to the terms and conditions' }).locator('input[type="checkbox"]').check();
  }
});

When('El usuario hace clic en Submit', async function ( ) {
  for (const page of pages) {
    await page.click('input[type="submit"]');
  }
});

Then('El sistema envia el formulario correctamente', async function () {
  for (const page of pages) {
    expect(validateFirstLocator(page, "div", divResult)).toBeTruthy();
  }
});

//Registro fallido por nombre no válido

Given("El usuario ingresa en la pagina del formulario", async () => {
  for (const page of pages) {
    console.log(`Ejecutando prueba en navegador: ${page.context().browser()?.browserType().name()}`);
    await page.goto(BASEURL);
  }
});

When('El usuario ingresa {string} incorrectamente en el campo First Name', async function (firstName: string) {
  for (const page of pages) {
    await page.fill("#firstname", firstName);
  }
});

When('El usuario hace clic en Submit para enviar la información', async function ( ) {
  for (const page of pages) {
    await page.click('input[type="submit"]');
  }
});

Then('El sistema muestra un mensaje de error indicando que el nombre no es válido', async function () {
  for (const page of pages) {
    const firstNameInput = page.locator('#firstname');

    // Obtenemos el mensaje de validación nativo
    const validationMessage = await firstNameInput.evaluate((el: HTMLInputElement) => el.validationMessage);

    // Validamos que contenga el mensaje esperado
    expect(validationMessage).toContain("Please fill out this field.");
  }
});

//Registro fallido por formato inválido en el campo Phone

Given("El usuario está en la pagina del formulario con los campos llenos", async () => {
  for (const page of pages) {
    console.log(`Ejecutando prueba en navegador: ${page.context().browser()?.browserType().name()}`);
    await page.goto(BASEURL);
  }
});

When('El usuario ingresa el {string} en el campo First Name', async function (firstName: string) {
  for (const page of pages) {
    //await page.fill("#firstName", firstName, { timeout: 60000 });
    await page.fill("#firstname", firstName);
  }
});

When('El usuario ingresa el {string} en el campo Last Name', async function (lastname: string) {
  for (const page of pages) {
   // await page.fill("#lastname", lastname, { timeout: 60000 });
    await page.fill("#lasttname", lastname);
  }
});

When('El usuario ingresa el {string} en el campo Email', async function (email: string) {
  for (const page of pages) {
    await page.fill("#email", email);
  }
});


When('El usuario selecciona el {string} en el campo Country code', async function (countryCode: string) {
   for (const page of pages) {

      // Buscar específicamente el select que está dentro del bloque que contiene "Country code"
      const countrySelect = page.locator('form div', { hasText: 'Country code' }).locator('select');

      // Esperar que esté visible
      await countrySelect.waitFor({ state: 'visible', timeout: 60000 });
  
      // Seleccionar la opción
      await countrySelect.selectOption({ label: countryCode });
  
      // Verificar que la opción quedó seleccionada
      const selected = await countrySelect.locator('option:checked').textContent();
      //console.log(`Seleccionado Country code: ${selected}`);
}
});

When('El usuario ingresa letras en {string} en el campo Phone Number', async function (phone: string) {
  for (const page of pages) {
    await page.fill("#Phno", phone);
  }
});

When('El usuario hace clic en Submit para enviar la información con el formato de Phone incorrecto', async function ( ) {
  for (const page of pages) {
    await page.click('input[type="submit"]');
  }
});

Then('El sistema muestra un mensaje de error indicando que el formato de Phone no es válido', async function () {
  for (const page of pages) {
    const phoneInput = page.locator('#Phno');

    // Obtenemos el mensaje de validación nativo
    const validationMessage = await phoneInput.evaluate((el: HTMLInputElement) => el.validationMessage);

    // Validamos que contenga el mensaje esperado
    expect(validationMessage).toContain("Please match the requested format.");
  }
});

//Registro fallido por no aceptar terminos y condiciones

Given("El usuario llena todos los campos pero no acepta terminos y condiciones", async () => {
  for (const page of pages) {
    console.log(`Ejecutando prueba en navegador: ${page.context().browser()?.browserType().name()}`);
    await page.goto(BASEURL);
  }
});

When('El usuario ingresa {string} en el campo del First Name', async function (firstName: string) {
  for (const page of pages) {
    //await page.fill("#firstName", firstName, { timeout: 60000 });
    await page.fill("#firstname", firstName);
  }
});

When('El usuario ingresa {string} en el campo del Last Name', async function (lastname: string) {
  for (const page of pages) {
   // await page.fill("#lastname", lastname, { timeout: 60000 });
    await page.fill("#lasttname", lastname);
  }
});

When('El usuario ingresa {string} en el campo del Email', async function (email: string) {
  for (const page of pages) {
    await page.fill("#email", email);
  }
});


When('El usuario selecciona {string} en el campo del Country code', async function (countryCode: string) {
   for (const page of pages) {

      // Buscar específicamente el select que está dentro del bloque que contiene "Country code"
      const countrySelect = page.locator('form div', { hasText: 'Country code' }).locator('select');

      // Esperar que esté visible
      await countrySelect.waitFor({ state: 'visible', timeout: 60000 });
  
      // Seleccionar la opción
      await countrySelect.selectOption({ label: countryCode });
  
      // Verificar que la opción quedó seleccionada
      const selected = await countrySelect.locator('option:checked').textContent();
      //console.log(`Seleccionado Country code: ${selected}`);
}
});

When('El usuario ingresa {string} en el campo del Phone Number', async function (phone: string) {
  for (const page of pages) {
    await page.fill("#Phno", phone);
  }
});

When('El usuario ingresa {string} en el campo del Address Line-1', async function (address1: string) {
  for (const page of pages) {
    await page.fill("#Addl1", address1);
  }
});

When('El usuario ingresa {string} en el campo del Address Line-2', async function (address2: string) {
  for (const page of pages) {
    await page.fill("#Addl2", address2);
  }
});

When('El usuario ingresa {string} en el campo del State', async function (state: string) {
  for (const page of pages) {
    await page.fill("#state", state);
  }
});

When('El usuario ingresa {string} en el campo del Postal-Code', async function (postal: string) {
  for (const page of pages) {
    await page.fill("#postalcode", postal);
  }
});

When('El usuario selecciona {string} en el campo del Country', async function (country: string) {
  for (const page of pages) {
    // Buscar el select que está dentro de un div que contiene la palabra "Postal-CodeCountry"
    const countrySelect = page.locator('form div', { hasText: 'Postal-CodeCountry' }).locator('select');

    // Esperar a que el select esté visible y listo para interactuar
    await countrySelect.waitFor({ state: 'visible', timeout: 60000 });

    // Seleccionar la opción por label
    await countrySelect.selectOption({ label: country });

    // Verificar la selección
    const selected = await countrySelect.locator('option:checked').textContent();
    //console.log(`Seleccionado Country: ${selected}`);
  }
});

When('El usuario ingresa {string} en el campo del Date Of Birth', async function (dob: string) {
  for (const page of pages) {
       // Convertir dob de formato dd/MM/yyyy a yyyy-MM-dd
       const [day, month, year] = dob.split('/');
       const formattedDate = `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;
   
       // Llenar el input
       await page.fill('#Date', formattedDate);
   
       // Opcional: verificar que se ingresó correctamente
       const value = await page.locator('#Date').inputValue();
       //console.log(`Fecha ingresada: ${value}`);
  }
});

When('El usuario selecciona {string} en el campo del Gender', async function (gender: string) {
  for (const page of pages) {
    const genderMap: Record<string, string> = {
      "Male": "male",
      "Female": "female",
      "Transgender": "trans"
    };
  
    for (const page of pages) {
      const genderId = genderMap[gender];
      if (!genderId) throw new Error(`Gender desconocido: ${gender}`);
  
      // Check usando el id
      await page.check(`#${genderId}`);
  
      //console.log(`Gender seleccionado: ${gender}`);
    }}
});

When('El usuario no marca la casilla de términos y condiciones', async function () {
  for (const page of pages) {
    const checkbox = page.locator('label', { hasText: 'I agree to the terms and conditions' })
    .locator('input[type="checkbox"]');

    // Si está marcada, la desmarcamos
    if (await checkbox.isChecked()) {
    await checkbox.uncheck();
    } else{
      await checkbox.uncheck();
    }
}
});

When('El usuario hace clic en Submit para enviar la información sin aceptar los terminos y condiciones', async function ( ) {
  for (const page of pages) {
    await page.click('input[type="submit"]');
  }
});

Then('El sistema muestra un mensaje de error indicando que el debes dar check para continuar', async function () {
  for (const page of pages) {
    const checkbox = page.locator('label', { hasText: 'I agree to the terms and conditions' })
    .locator('input[type="checkbox"]');

// Obtenemos el mensaje de validación del input
const validationMessage = await checkbox.evaluate((el: HTMLInputElement) => el.validationMessage);

// Validamos que contenga el texto esperado
expect(validationMessage).toContain("Please check this box if you want to proceed");
}
});



