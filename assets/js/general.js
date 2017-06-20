'use strict';
$(window).on('load', function () {

	$('.owl-carousel').owlCarousel({
		loop         : true,
		margin       : 0,
		nav          : true,
		items        : 1,
		navClass     : ['owl-prev material-icons','owl-next material-icons'],
		autoHeight   : true,
		responsive   : {
			0 : {
				items : 1
			}
		}
	});

	$.fn.equalHeights = function() {
		var rows = {};
		var rowNumber = 1;
		var rowTop;
		var currentRowTop;

		// Collect elements that lies at same position from top in groups
		this.each(function() {
			rowTop = $(this).offset().top;

			if (!currentRowTop) {
				currentRowTop = rowTop;
			}

			if (rowTop !== currentRowTop) {
				rowNumber += 1;
			}

			var rowNum = 'group' + rowNumber;
			var row = rows[rowNum];

			row ?
				rows[rowNum] = row.add($(this)) :
				rows[rowNum] = $().add($(this));

			currentRowTop = rowTop;
		});

		function setHeight (rows) {
			for (var elements in rows) {
				if (rows.hasOwnProperty(elements)) {
					rows[elements].height('auto');

					var maxHeight = 0;

					rows[elements].each(function() {
						if ($(this).height() > maxHeight) {
							maxHeight = $(this).height();
						}
					});

					rows[elements].height(maxHeight);
				}
			}
		}

		setHeight(rows);

		$(window).on('resize', function() {
			setHeight(rows);
		});

	};

	$('[data-equal-height]').equalHeights();

});
