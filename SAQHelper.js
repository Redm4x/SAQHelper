jQuery('.resultats_product').each(function(){
	var nbsp = String.fromCharCode(160);
	var Desc = jQuery(this).find('.desc').text();

	var UnitIndex = Desc.indexOf(nbsp + 'ml');
	if(UnitIndex != -1)
	{
		Desc = Desc.substr(0, UnitIndex);
		Desc = Desc.substr(Desc.lastIndexOf(','));
		var MiddleIndex = Desc.indexOf(nbsp + 'X' + nbsp);
		var Quantity = parseInt(Desc.substr(2, MiddleIndex-2));
		var Format = parseFloat(Desc.substr(MiddleIndex + 3));
	}
	else
	{
		UnitIndex = Desc.indexOf(nbsp + 'L');
		if(UnitIndex != -1)
		{
			Quantity = 1;
			Desc = Desc.substr(0, UnitIndex);
			Desc = Desc.substr(Desc.lastIndexOf(','));
			Format = parseFloat(Desc.substr(1, Desc.length - 1)) * 1000;
		}
		else
			return;
	}

	var PriceText = jQuery(this).find('.price').text();
	var Price = parseFloat(PriceText.substr(0, PriceText.length - 2));

	var URL = jQuery(this).find('a').first().attr('href');

	if(location.protocol == 'https:' && URL.substr(0, 5) != 'https')
		URL = 'https' + URL.substr(4);
	
	jQuery(this).find('.desc').append('<div class="Math" style="font-size: small;"></div>')
	Calcul(Price, Quantity, Format, URL, jQuery(this).find('.Math').first());
});

function Calcul(Price, Quantity, Format, URL, Elem)
{
	jQuery.get(URL, function(rep){
		var PourcentageIndex = rep.indexOf('&nbsp;%</span>');
		var Pourcentage = rep.substr(0,PourcentageIndex);
		Pourcentage = Pourcentage.substr(Pourcentage.lastIndexOf('>')+1);
		Pourcentage = parseInt(Pourcentage);

		var NbConso = Quantity * Format * Pourcentage / 355 / 5;
		var CostByConso = Price / NbConso;
		Elem.html('<br/>Nombre de conso : ' + NbConso.toFixed(2));
		Elem.append('<br/>Coût par conso : ' + CostByConso.toFixed(2) + "$");
	});
}