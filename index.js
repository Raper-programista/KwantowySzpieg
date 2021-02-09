qc.reset(3);
qc.discard();
var a = qint.new(1, 'Alice');
var fiber = qint.new(1, 'fiber');
var b = qint.new(1, 'Bob');

//funkcja losujaca bit
function random_bit(q) {
    q.write(1);
    q.had();
    return q.read();
}

//Generowanie dwuch losowych bitów
var send_had = random_bit(a);
var send_val = random_bit(a);

//Przygotowywanie kubitu Alice
a.write(0);
if(send_val) //Użyj losowego bitu dla ustawienia wartosci
   a.not();
if(send_had) //Użyj losowego bitu dla zastosowania HAD lub not
    a.had();

qc.nop();
qc.label('');

//wyślij kubit
fiber.exchange(a)

//Aktywacja szpiega
var spy_is_present = true;
if (spy_is_present)
{
    var spy_had = 0;
    
    if(spy_had)
        fiber.had();
        
    var stolen_data = fiber.read();
    fiber.write(stolen_data);
    if (spy_had)
        fiber.had()
}

//Otrzymywanie kubitu
var recv_had = random_bit(b);
fiber.exchange(b);
if(recv_had)
    b.had();
var recv_val = b.read();

//Teraz Alice wysyla maila do boba, żeby
//podać mu swoje ustawienia had i wartość
//jeśli ustawienia had się zgadzają, 
//a wartość nie - mają wszpiega!

if (send_had == recv_had)
    if (send_val != recv_val)
        qc.print('szpieg złapany');



    