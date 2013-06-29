function ParseFloat(num)
{
	return parseFloat(num.replace(',', '.'));
}

jQuery('.resultats_product').each(function(){
	var nbsp = String.fromCharCode(160);
	var Desc = jQuery(this).find('.desc').text();

	var UnitIndex = Desc.indexOf(nbsp + 'ml');
	if(UnitIndex != -1)
	{
		Desc = Desc.substr(0, UnitIndex);
		Desc = Desc.substr(Desc.lastIndexOf(','+nbsp));
		var MiddleIndex = Desc.indexOf(nbsp + 'X' + nbsp);
		if(MiddleIndex == -1)
		{
			Quantity = 1;
			Format = ParseFloat(Desc.substr(2));
		}
		else
		{
			var Quantity = parseInt(Desc.substr(2, MiddleIndex-2));
			var Format = ParseFloat(Desc.substr(MiddleIndex + 3));
		}
	}
	else
	{
		UnitIndex = Desc.indexOf(nbsp + 'L');
		if(UnitIndex != -1)
		{
			Quantity = 1;
			Desc = Desc.substr(0, UnitIndex);
			Desc = Desc.substr(Desc.lastIndexOf(','+nbsp));
			Format = ParseFloat(Desc.substr(1, Desc.length - 1)) * 1000;
		}
		else
			return;
	}

	var PriceText = jQuery(this).find('.price').text();
	var Price = ParseFloat(PriceText.substr(0, PriceText.length - 2));

	var URL = jQuery(this).find('a').first().attr('href');

	if(location.protocol == 'https:' && URL.substr(0, 5) != 'https')
		URL = 'https' + URL.substr(4);
	
	jQuery(this).find('.desc').append('<div class="Math" style="font-size: small;"></div>')
	Compute(Price, Quantity, Format, URL, jQuery(this).find('.Math').first());
});

function Compute(Price, Quantity, Format, URL, Elem)
{
	jQuery.get(URL, function(rep){
		var PercentageIndex = rep.indexOf('&nbsp;%</span>');
		var Percentage = rep.substr(0,PercentageIndex);
		Percentage = Percentage.substr(Percentage.lastIndexOf('>')+1);
		Percentage = ParseFloat(Percentage);

		var NbConso = Quantity * Format * Percentage / 355 / 5;
		var CostByConso = Price / NbConso;
		Elem.html('<br/>Nombre de conso : ' + NbConso.toFixed(2));
		Elem.append('<br/>Coût par conso : ' + CostByConso.toFixed(2) + "$");
	});
}