function controller(vDolar)
{       

    let dateString = document.getElementById("data").value; 

    let data = new Date(dateString)

    let timezoneOffset = data.getTimezoneOffset();

    data.setMinutes(data.getMinutes() + timezoneOffset);

    let dia = data.getDay()
    
    const value = Number(document.getElementById("vInicial").value.replace(",", "."));

    const target = Number(document.getElementById("vFinal").value.replace(",", "."));


    const select = document.getElementById("gesflusd");
    const opcaoValue = select.options[select.selectedIndex].value;

    
    let ges = true;

    if(opcaoValue == "não")
    {
        ges = false;
    }

    const tempo = document.getElementById("tempo").value;

    const check1 = document.getElementById("check1");
    const check2 = document.getElementById("check2");

    vDolar = Number(vDolar).toFixed(2)

    
    if(check1.checked)
    {
        calcValue(value, tempo, ges, dia, vDolar)        
        
    }

    else if(check2.checked) 
    {
        calcTime(value, target, ges, dia)
        
    }
    else
    {
        Swal.fire({
            width: '20em',
            icon: 'error',
            title: 'Atenção.',
            text: 'Não foi selecionado nenhum parâmetro para a projeção!',
            showConfirmButton: false
        })
    }
}

async function dolarNow(){
    await fetch('https://economia.awesomeapi.com.br/last/USD-BRL')
    .then(response => response.json())
    .then(data => {
        const cotacao = data.USDBRL.ask
        controller(cotacao)
    });
}


function calcValue(value, tempo, ges, dia, vDolar)
{   
    const aux = [0, 1, 2, 3, 4, 5, 6]

    if(value == 0 || value == null || tempo == null || tempo == 0 || !aux.includes(dia))
    {
        Swal.fire({
            width: '20em',
            icon: 'error',
            title: 'Atenção.',
            text: 'Algumas informações importantes não froam preenchidas!',
            showConfirmButton: false
        })
    }

    else {
        
        for(let i = 0; i < tempo; i++)
        {   
        
            if(ges)
            {
                if (dia == 5 && dia == 6)
                {

                    if (value >= 100000)
                    {
                        value += (Number(value.toString().substring(0, 5)) * 10) * 0.015 
                    }

                    else if (value >= 10000)
                    {
                        value += (Number(value.toString().substring(0, 4)) * 10) * 0.015
                    }

                    if (value >= 1000)
                    {
                        value += (Number(value.toString().substring(0, 3)) * 10) * 0.015
                    }

                    else if(value >= 100)
                    {
                        value += (Number(value.toString().substring(0, 2)) * 10) * 0.015
                    }

                    else
                    {
                        value += (Number(value.toString().substring(0, 1)) * 10) * 0.015
                    }

                }

                else 
                {
                    if (value >= 100000)
                    {
                        value += (Number(value.toString().substring(0, 5)) * 10) * 0.025 
                    }

                    else if (value >= 10000)
                    {
                        value += (Number(value.toString().substring(0, 4)) * 10) * 0.025
                    }

                    else if (value >= 1000)
                    {
                        value += (Number(value.toString().substring(0, 3)) * 10) * 0.025
                    }
                    
                    else if(value >= 100)
                    {
                        value += (Number(value.toString().substring(0, 2)) * 10) * 0.025
                    }
                    
                    else
                    {
                        value += (Number(value.toString().substring(0, 1)) * 10) * 0.025
                    }
                }
            }

            else {

                if(dia != 5 && dia != 6)
                {
                    if (value >= 100000)
                    {
                        value += (Number(value.toString().substring(0, 5)) * 10) * 0.025 
                    }

                    else if (value >= 10000)
                    {
                        value += (Number(value.toString().substring(0, 4)) * 10) * 0.025
                    }

                    else if (value >= 1000)
                    {
                        value += (Number(value.toString().substring(0, 3)) * 10) * 0.025
                    }
                    
                    else if(value >= 100)
                    {
                        value += (Number(value.toString().substring(0, 2)) * 10) * 0.025
                    }
                    
                    else
                    {
                        value += (Number(value.toString().substring(0, 1)) * 10) * 0.025
                    }
                }
                
            }

            dia++;
            
            if (dia == 7)
            {
                dia = 0;
            }

        
        }
        
        
        Swal.fire({
            title: 'Aí sim!',
            html: `O montante final (sem levar em conta bônus, comissões e variação de amplitude) 
            será de aproximadamente: <strong>$${value.toFixed(2)}</strong> o 
            que equivale a <strong>R$${(value * vDolar).toFixed(2)}</strong> na cotação atual do dolar.`,
            icon: 'success',
            showConfirmButton: false,
            width: '45em'
        })
    }


    

}

function calcTime(value, target, ges, dia)
{   
    
    let i = 0

    const aux = [0, 1, 2, 3, 4, 5, 6]


    if(value == 0 || value == null || target == null || target == 0 || !aux.includes(dia))
    {
        Swal.fire({
            width: '20em',
            icon: 'error',
            title: 'Atenção.',
            text: 'Algumas informações importantes não froam preenchidas!',
            showConfirmButton: false
        })
    }

    else
    {

        while(value < target)
        {   
            if(ges)
            {
                if (dia == 5 && dia == 6)
                {
                    if (value >= 100000)
                    {
                        value += (Number(value.toString().substring(0, 5)) * 10) * 0.025 
                    }

                    else if (value >= 10000)
                    {
                        value += (Number(value.toString().substring(0, 4)) * 10) * 0.025
                    }

                    else if (value >= 1000)
                    {
                        value += (Number(value.toString().substring(0, 3)) * 10) * 0.025
                    }

                    else if(value >= 100)
                    {
                        value += (Number(value.toString().substring(0, 2)) * 10) * 0.025
                    }

                    else
                    {
                        value += (Number(value.toString().substring(0, 1)) * 10) * 0.025
                    }

                }

                else 
                {
                    if (value >= 100000)
                    {
                        value += (Number(value.toString().substring(0, 5)) * 10) * 0.025 
                    }

                    else if (value >= 10000)
                    {
                        value += (Number(value.toString().substring(0, 4)) * 10) * 0.025
                    }

                    else if (value >= 1000)
                    {
                        value += (Number(value.toString().substring(0, 3)) * 10) * 0.025
                    }
                    
                    else if(value >= 100)
                    {
                        value += (Number(value.toString().substring(0, 2)) * 10) * 0.025
                    }
                    
                    else
                    {
                        value += (Number(value.toString().substring(0, 1)) * 10) * 0.025
                    }
                }
            }

            else {

                if(dia != 5 && dia != 6)
                {
                    if (value >= 100000)
                    {
                        value += (Number(value.toString().substring(0, 5)) * 10) * 0.025 
                    }

                    else if (value >= 10000)
                    {
                        value += (Number(value.toString().substring(0, 4)) * 10) * 0.025
                    }

                    else if (value >= 1000)
                    {
                        value += (Number(value.toString().substring(0, 3)) * 10) * 0.025
                    }
                    
                    else if(value >= 100)
                    {
                        value += (Number(value.toString().substring(0, 2)) * 10) * 0.025
                    }
                    
                    else
                    {
                        value += (Number(value.toString().substring(0, 1)) * 10) * 0.025
                    }
                }
                
            }

            i++;
            dia++;
            
            if (dia == 7)
            {
                dia = 0;
            }
        
        }

        
        Swal.fire({
            title: 'Não desiste, parceiro(a)...',
            html: `Para alcançar este montante você precisará de aproximadamente <strong>${i}</strong> dias (sem levar em conta algumas variáveis)!`,
            icon: 'info',
            showConfirmButton: false
        })   
    }
}
