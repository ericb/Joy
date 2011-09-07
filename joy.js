if(typeof Joy == 'undefined') {
    
    var Joy = Koi.define({
        
        screen:  null,  // holds the viewport data
        grid:    null,  // holds the grid object reference
        options: null,  // holds the options
        
        /**
         *  Joy Constructor
         *  Get's things started..
         */
        init: function( options ) {
            this.options = options;
            this.core();
        },
        
        /**
         *  Core
         *  Defines and instantiates all the Joy system classes.
         */
        core: function() {
            var joy = this;
            
            /**
             *  Sprite Module
             *  Allows you to dump a sprite to the screen.
             */
            var Sprite = Koi.define({
                
                dom: null,    // holds the dom information
                size: null,   // holds the sprite height / width
                sprite: null, // holds the sprite dom class
                 
                init: function( options ) {
                    this.size   = { height: options.height, width: options.width };
                    this.sprite = options.sprite;
                },
                
                
                // renders the sprite to the Joy sprite layer
                render: function( layer ) {
                    if(!this.dom) {
                        this.dom = document.createElement('div');
                        this.dom.style.className = this.sprite;
                    }
                }
                
            });
            
            /**
             *  Grid Module
             *  Allows you to set/read/render a set of tiles.
             */
            var Grid = Koi.define({
                
                grid: null, // holds all the tiles
                size: null, // holds the tile size
                rows: null, // number of grid rows
                cols: null, // number of grid columns
                
                init: function( tile_size, rows, cols ) {
                    if(!tile_size || !rows || !cols) { return false; } // TODO: throw error here
                    this.size = tile_size;
                    this.rows = rows;
                    this.cols = cols;
                    this.grid = [];
                    
                    for( var r = 0; r < this.rows; r++ ) {
                        var tiles = [];
                        for ( var c = 0; c < this.cols; c++ ) {
                            tiles.push( { row: r, col: c } );
                        }
                        this.grid.push( tiles );
                    }
                },
                
                get: function( row, col ) {
                    if(!this.exists(row,col)) { return false; } // TODO: throw error here
                    return this.grid[row][col];
                },
                
                exists: function( row, col ) {
                    if( row < 0 || col < 0 ) { return false; }
                    if( row <= this.rows && col <= this.cols ) { return true; } else { return false; }
                },
                
                render: function( row, col ) {
                    var tile = this.get(row,col);
                    if(!tile) { return false; } // TODO: throw error here
                    
                    if(tile.texture) {
                        // TODO: implement texture drawing
                    } else {
                        tile.texture = 'black-texture';
                    }
                    
                    if(!tile.dom) {
                        tile.dom = document.createElement('div');
                        tile.dom.style.position = 'absolute';
                        tile.dom.style.width  = this.size + 'px';
                        tile.dom.style.height = this.size + 'px';
                        tile.dom.style.left   = ( this.size * tile.col ) + 'px'; // x grid position
                        tile.dom.style.top    = ( this.size * tile.row ) + 'px'; // y grid position
                        document.getElementById(joy.screen.id).appendChild(tile.dom);
                    }
                    
                    // set the properties
                    tile.dom.className    = 'tile ' + tile.texture;
                }
            });
            
            
            /**
             *  Viewport
             *  Initiates the main Joy viewable area.
             */
            var viewport = Koi.define({
                
                /** 
                 *  Init
                 *  Draws the main DOM viewport
                 */
                init: function() {
                    joy.screen = { h: joy.options.height, w: joy.options.width, id: joy.options.id };

                    // dump a default if one wasn't specified
                    if(!joy.screen.id) {
                        var div = document.createElement('div');
                        div.id = 'joy-screen';
                        joy.screen.id = div.id;
                        document.body.appendChild(div);
                    }

                    joy.screen.dom = document.getElementById(joy.screen.id);
                    joy.screen.dom.style.height = joy.screen.h + 'px';
                    joy.screen.dom.style.width  = joy.screen.w + 'px';
                    joy.screen.dom.style.overflow = 'hidden';
                    joy.screen.dom.style.position = 'absolute';
                },
                
                /**
                 *  Render
                 *  Renders out an object to the screen
                 *  @param object   JoyObject (optional)
                 */
                render: function ( object ) {
                    if(!object) {
                        //joy.screen.dom.style.backgroundColor = "#000";
                    } else {
                        // TODO: implement joy object handling
                    }
                }
                
            });
            
            // Define Modules for import
            var modules = { 'Grid': Grid };
            joy.modules = modules;
            
            // Setup system modules
            joy.viewport = new viewport;
        },
        
        import: function( module ) {
            if(this.modules[module] != 'undefined') {
                return this.modules[module];
            }
        }
        
    });
    
}