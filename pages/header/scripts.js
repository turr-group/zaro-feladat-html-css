$(document).ready(function() {
    var header = $(`.header`);
    var main = $(`.main`);
    /* Stílusok */
    var styles = {
        menu_regions: [`menu_item`, `menu_sub_item`, `menu_button`],
        menu_item: [
            `rgba(255, 0, 0, 0.7)`,             // 0    active  bkg color
            `rgba(0, 0, 0, 0.5)`,               // 1    passive bkg color
            `rgba(255, 255, 255, 1)`,           // 2    active font color
            `rgba(255, 255, 255, 1)`,           // 3    passive font color
            1,0.5,2,2                           // 4,5  font size, font scale active, 6,7 font size, font scale passive 
        ],
        menu_sub_item: [
            `rgba(0, 255, 255, 1)`,
            `rgba(0, 0, 0, 0.5)`,
            `rgba(255, 255, 255, 1)`,
            `rgba(255, 255, 255, 1)`,
            1,0.5,2,2
        ],
        menu_button: [
            `rgba(0, 255, 0, 0.5)`,
            `rgba(0, 64, 0, 0.5)`,
            `rgba(255, 255, 255, 1)`,
            `rgba(255, 255, 255, 1)`,
            1,0.5,2,2
        ],
        active_item: [
            `rgba(255, 0, 0, 0.7)`,
            0,
            `rgba(255, 255, 255, 0.5)`,
            0,
            1,0.5,2,2
        ]
    };

    /* menu elemek stílus formázása */
    function menu_items_style(item,state) {
        if (state == `active`) {
            $(`.${item}`).css("background-color",styles[ `${item}`][0]);
            $(`.${item}`).css("color",styles[ `${item}`][2] );
            $(`.${item}`).css(`font-size`,`calc(${styles[ `${item}`][6]}rem + ${styles[ `${item}`][7]}vw)`);
        } else {
            $(`.${item}`).css("background-color",styles[ `${item}`][1]);
            $(`.${item}`).css("color",styles[ `${item}`][3] );
            $(`.${item}`).css(`font-size`,`calc(${styles[ `${item}`][4]}rem + ${styles[ `${item}`][5]}vw)`);
        }
    }
    for (let i = 0; i < styles.menu_regions.length; i++) {
        menu_items_style(`${styles.menu_regions[i]}`,`passive`);
    }

    /*  A headeren belül menu-ben található al listák kapcsolójainak funkciója */
    let item = $(`.menu_item`);
    let count = 0;
    for (let i = 0; i < ($(`.menu_button`).length+1); i++) {
        let menu = $(`.menu_sub_${i}`);
        $(`.menu_button_${i}`).click(function() {
            // active
            if (menu.css("display") == "none" ) {
                menu.css("display","inline-block");
                $(this).css("background-color",styles.menu_button[0]);
                $(this).css("color",styles.menu_button[2]);
                item.css("color","rgba(255, 255, 255, 0.7)");
                item.css(`font-size`,`calc(${styles.menu_item[4]}rem + ${styles.menu_item[5]/2}vw)`);
                count += 1;
            } else {
                // passive
                menu.css("display","none");
                count -= 1;
                if (count == 0) {
                    item.css(`font-size`,`calc(${styles.menu_item[4]}rem + ${styles.menu_item[5]}vw)`);
                    item.css("color","rgba(255, 255, 255, 1)");
                    $(this).css("background-color",styles.menu_button[1]);
                    $(this).css("color",styles.menu_button[3]);
                }
            }
        });
    }
    
    /*  A headeren belül menu-ben található lista elemek funkciója
    */
    var last_page;
    var current_page;
    for (let i = 0; i < ($(`.menu_sub_item`).length + $(`.menu_item`).length); i++) {
        current_page = $(`#page${i}`);
        current_page.click(function(){
            $(".main").load(`./pages/${i}/page.html`);
            if ($(last_page).attr('id') == $(this).attr('id') ) {
                if (header.css("flex") == "3 1 0%") {
                    header.css("flex","0.2");
                    main.css("flex","3");
                } else {
                    header.css("flex","3");
                    main.css("flex","0.6");
                }
            } else {
                header.css("flex","0.2");
                main.css("flex","3");
            }
            if (typeof last_page !== 'undefined') {
                if (last_page.hasClass(`menu_sub_item`)) {
                    last_page.css(`background-color`,styles.menu_sub_item[1]);
                } else {
                    last_page.css(`background-color`,styles.menu_item[1]);
                }
            }
            $(this).css("background-color",styles.active_item[0]);
            last_page = $(this);
        });
    }
});
