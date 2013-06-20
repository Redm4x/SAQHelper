jQuery('.resultats_product').each(function(){
	var nbsp = String.fromCharCode(160);
	var Desc = jQuery(this).find('.desc').text();
	var UnitIndex = Desc.indexOf(nbsp + 'ml');
	if(UnitIndex == -1) return;
	Desc = Desc.substr(0, UnitIndex);
	Desc = Desc.substr(Desc.lastIndexOf(','));
	var MiddleIndex = Desc.indexOf(nbsp + 'X' + nbsp);
	var Quantity = parseInt(Desc.substr(2, MiddleIndex-2));
	var Format = parseInt(Desc.substr(MiddleIndex + 3));

	var PriceText = jQuery(this).find('.price').text();
	var Price = parseFloat(PriceText.substr(0, PriceText.length - 2));

	var URL = jQuery(this).find('a').first().attr('href');
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