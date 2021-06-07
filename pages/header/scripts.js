$(document).ready(function() {
    /* A headerben lévő menu-n belül lévő betűtípusok beállítása
    */
    /* Stílusok */
    var styles = {
        menu_regions: [`menu_item`, `menu_sub_item`, `menu_button`],
        menu_item: [
            `rgba(255, 0, 0, 0.7)`,         // 0    active  bkg color
            `rgba(0, 0, 0, 0)`,             // 1    passive bkg color
            `rgba(200, 200, 200, 1)`,       // 2    active font color
            `rgba(200, 200, 200, 0.5)`,     // 3    passive font color
            1,0.5                             // 4,5  font size, font scale
        ],
        menu_sub_item: [
            `rgba(0, 255, 255, 1)`,
            `rgba(0, 0, 255, 0.5)`,
            `rgba(200, 200, 200, 1)`,
            `rgba(200, 200, 200, 0.5)`,
            1,1
        ],
        menu_button: [
            `rgba(0, 255, 0, 0.5)`,
            `rgba(0, 255, 0, 0.5)`,
            `rgba(255, 255, 255, 1)`,
            `rgba(255, 255, 255, 0.8)`,
            1,0.5
        ],
        active_item: [
            `rgba(255, 0, 0, 0.7)`,
            0,
            `rgba(255, 255, 255, 0.5)`,
            0,
            1,1
        ]
    };

    function menu_items_style(item,state) {
        if (state == `active`) {
            $(`.${item}`).css("background-color",styles[ `${item}`][0]);
            $(`.${item}`).css("color",styles[ `${item}`][2] );
        } else {
            $(`.${item}`).css("background-color",styles[ `${item}`][1]);
            $(`.${item}`).css("color",styles[ `${item}`][3] );
        }
        $(`.${item}`).css(`font-size`,`calc(${styles[ `${item}`][4]}rem + ${styles[ `${item}`][5]}vw)`);
    }

    for (let i = 0; i < styles.menu_regions.length; i++) {
        menu_items_style(`${styles.menu_regions[i]}`,`passive`);
    }

    /*  A headeren belül menu-ben található al listák kapcsolójainak
        funkciója
    */
    let item = $(`.menu_item`);
    let count = 0;
    
    for (let i = 0; i < 3; i++) {
        let button = $(`.menu_button_${i}`);
        let menu = $(`.menu_sub_${i}`);
        button.click(function() {
            if (menu.css("display") == "none" ) {
                menu.css("width", "fit-content");
                menu.css("display","block");
                menu.css("opacity","100%");
                button.css("background-color",styles.menu_button[0]);
                button.css("color",styles.menu_button[2]);
                item.css("color","rgba(255, 255, 255, 0.7)");
                item.css(`font-size`,`calc(${styles.menu_item[4]}rem + ${styles.menu_item[5]/2}vw)`);
                count += 1;
            } else {
                menu.css("width", "0ch");
                menu.css("display","none");
                count -= 1;
                if (count == 0) {
                    item.css(`font-size`,`calc(${styles.menu_item[4]}rem + ${styles.menu_item[5]}vw)`);
                    item.css("color","rgba(255, 255, 255, 1)");
                    button.css("background-color",styles.menu_button[1]);
                    button.css("color",styles.menu_button[3]);
                }
            }
        });
    }
    
    /*  A headeren belül menu-ben található lista elemek funkciója
    */
    var last_page;
    var current_page;
    for (let i = 0; i < 10; i++) {
        current_page = $(`#page${i}`);
        current_page.click(function(){
        //    color = current_page.css(`background-color`);
            $(".main").load(`./pages/${i}/page.html`);
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
