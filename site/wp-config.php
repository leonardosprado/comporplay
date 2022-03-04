<?php

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u212360942_bR5tk' );

/** Database username */
define( 'DB_USER', 'u212360942_AZAAE' );

/** Database password */
define( 'DB_PASSWORD', 'ADkT2pMVgt' );

/** Database hostname */
define( 'DB_HOST', 'mysql' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '1Bv(nGgs0%DKvZ3 ?-IG~%y=6PVP~+m/xg!7m5v#ZfNTJ/x}pph2UW!!e=VMR!T7' );
define( 'SECURE_AUTH_KEY',   'P7hi>i dX3 MlBl3K^Z +5{!*ri<H,F~42f{9ojo|~7=nGwL$QEYrrGO!fUg~`[i' );
define( 'LOGGED_IN_KEY',     ')K[Uo1x&w.~9D2jUXF@c[Yg)!H~zC{-^:UHvqfnw.A0>i=5Xqx2B@ON$3FtgFT!;' );
define( 'NONCE_KEY',         'Hc&;+NlF!_5C;t23kzGAS-zuyFGDheAQV_whOkvM]j#O^G#mgi~& 3z*17E8K&ck' );
define( 'AUTH_SALT',         '?l`Gfd35X.8V|Xv?u29 5T2(sFr^imY]qkX4MbvAjyb)q]:rt]M[$Rns5sY:oA-7' );
define( 'SECURE_AUTH_SALT',  'DYTNniZ34|ZO3j9+Xh~e`b-z.`?xPC:t5h+O*d3Q)ihsLM9ll?]RBg_o~E*FjkIX' );
define( 'LOGGED_IN_SALT',    '.;U C(5%e`A5sK{@DpWO<`)!Uk~;oPRXg`+rDMCYu{VQq`erCR`31b5%GIa(uL b' );
define( 'NONCE_SALT',        'Y[&;;oG^M3 XeF1{{/a?Hrms>XWz}j86bb<rZ#qr3Pd+_;ioMEu,P>T]^Ni%|[d#' );
define( 'WP_CACHE_KEY_SALT', 'U*}OU7Kqu4JoHd1v^tBmask[$s|tJt=7sm%q67qzR5_UW(Jm=9S{^+tt:U*@^#7 ' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );


/* Add any custom values between this line and the "stop editing" line. */



define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
