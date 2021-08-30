//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.25;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.25] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x43c7f8=_0x4ee1;(function(_0xd85a17,_0x3508f2){const _0x162421=_0x4ee1,_0x3586a1=_0xd85a17();while(!![]){try{const _0x331005=-parseInt(_0x162421(0x21d))/0x1+parseInt(_0x162421(0x85))/0x2+parseInt(_0x162421(0x205))/0x3+-parseInt(_0x162421(0x1eb))/0x4*(parseInt(_0x162421(0x1a8))/0x5)+parseInt(_0x162421(0x156))/0x6*(parseInt(_0x162421(0xf3))/0x7)+-parseInt(_0x162421(0x1f1))/0x8*(parseInt(_0x162421(0x22c))/0x9)+-parseInt(_0x162421(0x2ad))/0xa;if(_0x331005===_0x3508f2)break;else _0x3586a1['push'](_0x3586a1['shift']());}catch(_0x257ee7){_0x3586a1['push'](_0x3586a1['shift']());}}}(_0xf9c1,0x46955));var label=_0x43c7f8(0x2fa),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x43c7f8(0x128)](function(_0x59609c){const _0x13886b=_0x43c7f8;return _0x59609c[_0x13886b(0x1ee)]&&_0x59609c[_0x13886b(0x1b4)][_0x13886b(0x123)]('['+label+']');})[0x0];function _0xf9c1(){const _0x1a249b=['prepareAutoSizeEscapeCharacters','AddAutoColor','TextCodeReplace','NameBoxWindowOffsetY','AutoColorBypassList','setColorLock','nextEventCode','processPyTextCode','ParseArmorNotetags','MessageWidth','FcTpf','\x1bITALIC[1]','Width','choices','25715ffeQkm','ParseItemNotetags','add','CFzkG','return\x20\x27','processStoredAutoColorChanges','colSpacing','constructor','GcUWm','indent','textSizeExTextAlignment','XMHpz','description','Window_Base_processControlCharacter','nUXXc','MessageWindowProperties','IikIJ','adjustShowChoiceCancel','xLpxO','QyLoS','initialize','join','ssPiQ','setMessageWindowWidth','processDrawCenteredPicture','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','TEXTALIGNMENT','postFlushTextState','\x1bTEXTALIGNMENT[3]','cDiVT','syAel','clearActorNameAutoColor','Window_Base_textSizeEx','<WORDWRAP>','\x1bTEXTALIGNMENT[2]','onDatabaseLoaded','instantTextSpeed','process_VisuMZ_MessageCore_TextCodes_Replace','prepareShowTextCommand','xoxtg','choicePositionType','Match','\x1bI[%1]','_MessageCoreSettings','getLastGainedItemData','adjustShowChoiceDefault','HelpWindow','fontBold','setFaceImage','OPSmc','TextManager_message','_autoPosRegExp','ChoiceWindowLineHeight','padding','messageRows','\x1bTEXTALIGNMENT[0]','zZkeC','preFlushTextState','addedWidth','makeFontBigger','map\x20actor','General','\x1bITALIC[0]','test','prepareShowTextFollowups','victory','getTextAlignment','16zohErh','Window_NameBox_updatePlacement','moveBy','status','processAutoColorWords','RyrZt','4108000SjKKtB','_moveTargetHeight','drawItem','_moveTargetWidth','drawBackCenteredPicture','NUM','createTextState','ParseWeaponNotetags','isRTL','_dimmerSprite','BOLD','choiceTextAlign','currentExt','_index','miVAx','vtoJM','Window_Help_refresh','isTriggered','SortObjectByKeyLength','getChoiceListTextAlign','256521sifFcZ','createContents','FontSmallerCap','isWeapon','clear','convertNewPageTextStateMacros','textWidth','parameters','ARRAYSTR','applyData','AddOption','processFsTextCode','processMessageCoreEscapeActions','returnPreservedFontSettings','ZKGhM','follower','preConvertEscapeCharacters','slice','moveTo','start','Game_Map_updateEvents','Window_Message_synchronizeNameBox','Armors','prototype','87763lwAsiQ','QHELH','obtainGold','makeCommandList','tdSdK','remove','YTMzX','VWrLU','Window_Base_processAllText','resetPositionX','convertBackslashCharacters','newPage','VisuMZ_0_CoreEngine','PbexG','StretchDimmedBg','9fjxmaV','fontSize','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','parse','processTextAlignmentX','aQBOH','RxWSX','TextJS','currencyUnit','replace','TextCodeActions','openness','getPreservedFontSettings','NameBoxWindowDefaultColor','isSceneBattle','WordWrap','processEscapeCharacter','WRAPBREAK','DSavs','isBusy','resetWordWrap','fontFace','WORD_WRAP_PADDING','processPreviousColor','quantity','</B>','contentsBack','faceWidth','DefaultOutlineWidth','_messagePositionReset','value','resetRect','HrxyT','vVRcN','PICTURE','ZHGSu','changePaintOpacity','itemRectWithPadding','EicAu','addGeneralOptions','COLORLOCK','ptFvd','partyMemberName','code','convertLockColorsEscapeCharacters','nnXkf','isWordWrapEnabled','Instant','addContinuousShowTextCommands','ENABLE','updateForcedPlacement','outlineColor','ConfigManager_makeData','isContinuePrepareShowTextCommands','_nameBoxWindow','AutoColor','clampPlacementPosition','adjustShowChoiceExtension','messageWidth','exit','[0]','selectDefault','_commonEventId','UOkWr','toUpperCase','parseChoiceText','processControlCharacter','maxCommands','substring','_autoSizeRegexp','convertEscapeCharacters','isPressed','convertHardcodedEscapeReplacements','RelativePXPY','_wholeMoveDuration','LglVX','STRUCT','easeInOut','applyMoveEasing','\x1bCOLORLOCK[1]','convertTextAlignmentEscapeCharacters','Window_Message_newPage','setupItemChoice','Type','kzJWC','updateAutoSizePosition','<B>','version','isVolumeSymbol','onChoice','shift','textSpeedStatusText','innerWidth','isHelpWindowWordWrap','hSTPk','setWordWrap','setChoiceListTextAlign','isChoiceVisible','obtainExp','setLastGainedItemData','cGUkf','textSizeEx','IIRey','false','obtainEscapeString','tFnIn','FastForwardKey','Window_Options_changeVolume','\x1bBOLD[1]','zraSx','addContinuousShowChoices','addMessageCoreTextSpeedCommand','length','Skills','processAutoSize','KyMkw','Enemies','registerActorNameAutoColorChanges','boxWidth','isColorLocked','xnZPJ','max','FontBiggerCap','currentCommand','</COLORLOCK>','normalColor','lYMPQ','choiceCols','TextStr','940440yFbzyj','defaultColor','processCustomWait','setMessageWindowWordWrap','Window_Options_isVolumeSymbol','trim','none','lineHeight','IfYwo','changeVolume','setTextAlignment','RgLtS','postConvertEscapeCharacters','\x1bCOLORLOCK[0]','right','CommonEvent','VlPGh','CreateAutoColorRegExpLists','_autoColorActorNames','makeFontSmaller','_moveTargetX','getConfigValue','</I>','AutoColorRegExp','Window_Options_addGeneralOptions','updateOverlappingY','messageWordWrap','messageCoreWindowX','hBUPP','_autoSizeCheck','wmwOV','Window_Message_terminateMessage','wccpM','FontChangeValue','battleTargetName','lILnn','YuUUK','convertMessageCoreEscapeActions','changeTextSpeed','textCodeCheck','push','pHWov','messageCoreTextSpeed','setHelpWindowWordWrap','convertVariableEscapeCharacters','iconIndex','TextSpeed','textSizeExWordWrap','_moveTargetY','CRGBJ','loadPicture','map\x20event','addMessageCoreCommands','convertBaseEscapeCharacters','maxLines','isMessageWindowWordWrap','_scene','process_VisuMZ_MessageCore_TextCodes_Action','MuKdx','itemPadding','LvuZT','JKMdm','wtPTB','lOcNh','CsKtq','rOreP','statusText','_list','processColorLock','clearCommandList','_forcedPosition','LzNrA','list','\x5c%1','windowPadding','getMessageWindowWidth','changeValue','MessageCore','canMove','blt','_target','iDgWE','maxCols','surprise','TightWrap','EVAL','SHOW','registerCommand','command101','updateRelativePosition','convertTextMacros','convertChoiceMacros','exec','PUVDg','helpWordWrap','ANY','match','inBattle','initMessageCore','Window_Message_updatePlacement','CreateAutoColorFor','battle\x20actor','Center','drawing','Window_Base_processNewLine','fontItalic','members','CENTERPICTURE','refresh','_messageCommonEvents','index','map\x20player','WAIT','processDrawPicture','<BR>','ChoiceWindowMaxRows','eARyV','isCommandEnabled','clamp','mdyfy','_action','MessageTextDelay','setTextDelay','mWzku','left','vNIuf','800812oYqNUP','clearFlags','startX','ParseClassNotetags','_wordWrap','TextColor%1','vwXHX','addCommand','getChoiceListMaxRows','gainItem','WlbWd','<RIGHT>','floor','States','convertShowChoiceEscapeCodes','Weapons','_textColorStack','processNewLine','getMessageWindowRows','obtainEscapeParam','default','itemHeight','choiceRows','maxChoiceWidth','Undefined','battleActionName','windowWidth','isChoiceEnabled','outputWidth','message','process_VisuMZ_MessageCore_TextMacros','bplYQ','Window_Base_update','easeIn','updateBackground','messagePositionReset','TextAlign','boxHeight','setChoiceListLineHeight','_targets','messageWindowRect','close','getChoiceListMaxColumns','true','mainFontFace','prepareWordWrapEscapeCharacters','COMMONEVENT','MaxCols','Scene_Boot_onDatabaseLoaded','height','placeCancelButton','GwYhm','ChoiceWindowTextAlign','updatePlacement','outputHeight','_textDelay','wPOcD','choiceLineHeight','processWrapBreak','onProcessCharacter','UvmGw','setBackground','dOmeE','resetFontSettings','calcWindowHeight','isInputting','updateEvents','isBreakShowTextCommands','Game_Map_setupEvents','EGava','pNGqa','isHOd','_textAlignment','MessageWindow','convertMessageCoreEscapeReplacements','PHlIx','setMessageWindowRows','calcMoveEasing','battle\x20party','round','ParseAllNotetags','_subject','_centerMessageWindow','Name','stretchDimmerSprite','sQEem','scale','process_VisuMZ_MessageCore_AutoColor','launchMessageCommonEvent','defeat','format','coNIW','setSpeakerName','\x1bTEXTALIGNMENT','initTextAlignement','_messageWindow','convertFontSettingsEscapeCharacters','ysamx','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_interpreter','isItem','ARRAYFUNC','event','toLowerCase','_autoPositionTarget','processActorNameAutoColorChanges','setChoiceListMaxRows','processTextAlignmentChange','\x1bi[%1]%2','mainFontSize','726705IVXxlx','MaxRows','battleUserName','_colorLock','setChoiceListMaxColumns','addWrapBreakAfterPunctuation','Game_Interpreter_setupChoices','makeDeepCopy','_positionType','_indent','split','isRunning','sort','nCMzz','jztkN','obtainItem','_moveEasingType','CreateAutoColorRegExpListEntries','drawTextEx','MAUnZ','drawBackPicture','\x1bTEXTALIGNMENT[1]','Scene_Options_maxCommands','indexOf','type','</RIGHT>','AdjustRect','VEGfX','_relativePosition','STR','CPOoT','_spriteset','lRDbY','Items','ParseStateNotetags','followers','innerHeight','changeTextColor','haElk','ePnal','processFontChangeItalic','textCodeResult','outLineColor','Game_Party_initialize','LineBreakSpace','isArmor','processCommonEvent','textColor','includes','paintOpacity','inputtingAction','ConvertParams','setupChoices','filter','EvwDn','bind','qUurd','setupNumInput','Game_Map_initialize','startWait','ParseEnemyNotetags','Game_System_initialize','updateTransform','pqcPA','EndPadding','Window_Base_changeTextColor','<I>','ParseSkillNotetags','width','faceName','<LINE\x20BREAK>','Window_Message_isTriggered','LineHeight','ActionJS','actor','MWfCB','_data','name','addMessageCommonEvent','getChoiceListLineHeight','processCharacter','updateOffsetPosition','Window_ChoiceList_windowX','findTargetSprite','\x1bC[%1]%2\x1bPREVCOLOR[0]','ConfigManager_applyData','processAllText','_resetRect','LWPnM','WaYdf','DISABLE','Game_Party_gainItem','Window_Base_initialize',')))','ChoiceWindowProperties','Window_Message_clearFlags','actorName','Window_Base_processEscapeCharacter','terminateMessage','30gtmtgl','ConvertTextAutoColorRegExpFriendly','<%1>','mxkCM','ARRAYSTRUCT','rtl','windowX','setupEvents','processPxTextCode','makeData','ybSjW','_textDelayCount','pqMgh','Window_NameBox_refresh','_lastGainedItemData','call','mahqT','textSpeed','applyDatabaseAutoColor','refreshDimmerBitmap','\x1bBOLD[0]','battle\x20enemy','_moveDuration','updateDimensions','_texts','setWaitMode','synchronizeNameBox','processAutoPosition','map','addedHeight','Actors','nCiYf','map\x20party','whSLy','QfcBo','UYjFa','min','Window_ChoiceList_updatePlacement','updateMove','choice','update','Rows','setRelativePosition','HIDE','pWfUD','_cancelButton','_showFast','\x1bWrapBreak[0]','text','databaseObjectName','Settings','contents','emgvH','updateNameBoxMove','<LEFT>','gJCbQ','substr','TextMacros','addLoadListener','sBevU','ChoiceWindowMaxCols','ceil','isAutoColorAffected','Classes','ARRAYJSON','</LEFT>','</WORDWRAP>','resetTextColor'];_0xf9c1=function(){return _0x1a249b;};return _0xf9c1();}VisuMZ[label][_0x43c7f8(0x188)]=VisuMZ[label][_0x43c7f8(0x188)]||{},VisuMZ[_0x43c7f8(0x126)]=function(_0x60efcc,_0xf810e3){const _0x1ed4da=_0x43c7f8;for(const _0x35e9e2 in _0xf810e3){if(_0x1ed4da(0x175)===_0x1ed4da(0x2e7)){const _0x1b2fbd=this[_0x1ed4da(0x98)](_0x36f61d);this[_0x1ed4da(0x189)][_0x1ed4da(0x22d)]=_0x1b2fbd[_0x1ed4da(0x7d)](_0x10fc5a[_0x1ed4da(0x2fa)][_0x1ed4da(0x188)][_0x1ed4da(0x1e5)][_0x1ed4da(0x207)],_0x30dd2a[_0x1ed4da(0x2fa)][_0x1ed4da(0x188)]['General']['FontBiggerCap']);}else{if(_0x35e9e2[_0x1ed4da(0x30d)](/(.*):(.*)/i)){const _0xd8ecd4=String(RegExp['$1']),_0x2ef0a7=String(RegExp['$2'])[_0x1ed4da(0x26c)]()[_0x1ed4da(0x2b2)]();let _0x4b609e,_0x58d8f3,_0x82f857;switch(_0x2ef0a7){case _0x1ed4da(0x1f6):_0x4b609e=_0xf810e3[_0x35e9e2]!==''?Number(_0xf810e3[_0x35e9e2]):0x0;break;case'ARRAYNUM':_0x58d8f3=_0xf810e3[_0x35e9e2]!==''?JSON[_0x1ed4da(0x22f)](_0xf810e3[_0x35e9e2]):[],_0x4b609e=_0x58d8f3[_0x1ed4da(0x172)](_0x47155f=>Number(_0x47155f));break;case _0x1ed4da(0x302):_0x4b609e=_0xf810e3[_0x35e9e2]!==''?eval(_0xf810e3[_0x35e9e2]):null;break;case'ARRAYEVAL':_0x58d8f3=_0xf810e3[_0x35e9e2]!==''?JSON[_0x1ed4da(0x22f)](_0xf810e3[_0x35e9e2]):[],_0x4b609e=_0x58d8f3[_0x1ed4da(0x172)](_0x3b0822=>eval(_0x3b0822));break;case'JSON':_0x4b609e=_0xf810e3[_0x35e9e2]!==''?JSON[_0x1ed4da(0x22f)](_0xf810e3[_0x35e9e2]):'';break;case _0x1ed4da(0x196):_0x58d8f3=_0xf810e3[_0x35e9e2]!==''?JSON[_0x1ed4da(0x22f)](_0xf810e3[_0x35e9e2]):[],_0x4b609e=_0x58d8f3['map'](_0x523a71=>JSON[_0x1ed4da(0x22f)](_0x523a71));break;case'FUNC':_0x4b609e=_0xf810e3[_0x35e9e2]!==''?new Function(JSON[_0x1ed4da(0x22f)](_0xf810e3[_0x35e9e2])):new Function('return\x200');break;case _0x1ed4da(0xea):_0x58d8f3=_0xf810e3[_0x35e9e2]!==''?JSON[_0x1ed4da(0x22f)](_0xf810e3[_0x35e9e2]):[],_0x4b609e=_0x58d8f3['map'](_0x4ca5c5=>new Function(JSON[_0x1ed4da(0x22f)](_0x4ca5c5)));break;case _0x1ed4da(0x110):_0x4b609e=_0xf810e3[_0x35e9e2]!==''?String(_0xf810e3[_0x35e9e2]):'';break;case _0x1ed4da(0x20d):_0x58d8f3=_0xf810e3[_0x35e9e2]!==''?JSON[_0x1ed4da(0x22f)](_0xf810e3[_0x35e9e2]):[],_0x4b609e=_0x58d8f3[_0x1ed4da(0x172)](_0x17e815=>String(_0x17e815));break;case _0x1ed4da(0x278):_0x82f857=_0xf810e3[_0x35e9e2]!==''?JSON[_0x1ed4da(0x22f)](_0xf810e3[_0x35e9e2]):{},_0x60efcc[_0xd8ecd4]={},VisuMZ['ConvertParams'](_0x60efcc[_0xd8ecd4],_0x82f857);continue;case _0x1ed4da(0x15a):_0x58d8f3=_0xf810e3[_0x35e9e2]!==''?JSON[_0x1ed4da(0x22f)](_0xf810e3[_0x35e9e2]):[],_0x4b609e=_0x58d8f3[_0x1ed4da(0x172)](_0xdd913c=>VisuMZ[_0x1ed4da(0x126)]({},JSON[_0x1ed4da(0x22f)](_0xdd913c)));break;default:continue;}_0x60efcc[_0xd8ecd4]=_0x4b609e;}}}return _0x60efcc;},(_0x39e37c=>{const _0x3aa5bd=_0x43c7f8,_0x52a180=_0x39e37c[_0x3aa5bd(0x140)];for(const _0x57da69 of dependencies){if(!Imported[_0x57da69]){alert(_0x3aa5bd(0x1c1)[_0x3aa5bd(0xdf)](_0x52a180,_0x57da69)),SceneManager['exit']();break;}}const _0x1eb503=_0x39e37c[_0x3aa5bd(0x1b4)];if(_0x1eb503['match'](/\[Version[ ](.*?)\]/i)){if('GBqSy'!==_0x3aa5bd(0x14c)){const _0xc6bf72=Number(RegExp['$1']);_0xc6bf72!==VisuMZ[label][_0x3aa5bd(0x283)]&&(alert(_0x3aa5bd(0xe7)[_0x3aa5bd(0xdf)](_0x52a180,_0xc6bf72)),SceneManager[_0x3aa5bd(0x267)]());}else return this[_0x3aa5bd(0x1a0)]()===0x191;}if(_0x1eb503[_0x3aa5bd(0x30d)](/\[Tier[ ](\d+)\]/i)){const _0x4fd0ce=Number(RegExp['$1']);if(_0x4fd0ce<tier){if(_0x3aa5bd(0x11a)!==_0x3aa5bd(0x21e))alert(_0x3aa5bd(0x22e)[_0x3aa5bd(0xdf)](_0x52a180,_0x4fd0ce,tier)),SceneManager[_0x3aa5bd(0x267)]();else{const _0x372503={'x':this['x'],'y':this['y']};_0x42f111[_0x3aa5bd(0x21c)][_0x3aa5bd(0x17c)][_0x3aa5bd(0x165)](this),this[_0x3aa5bd(0x18b)](_0x372503);}}else tier=Math[_0x3aa5bd(0x2a5)](_0x4fd0ce,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x3aa5bd(0x188)],_0x39e37c['parameters']);})(pluginData),PluginManager[_0x43c7f8(0x304)](pluginData[_0x43c7f8(0x140)],_0x43c7f8(0x151),_0x4dc52c=>{const _0x5a357b=_0x43c7f8;VisuMZ['ConvertParams'](_0x4dc52c,_0x4dc52c);const _0x5e1f08=_0x4dc52c[_0x5a357b(0x13b)]||$gameSystem[_0x5a357b(0x142)]()||0x1,_0x5465be=_0x4dc52c[_0x5a357b(0xf4)]||$gameSystem[_0x5a357b(0x8d)]()||0x1,_0x48f5d7=_0x4dc52c[_0x5a357b(0xb4)]||$gameSystem['getChoiceListMaxColumns']()||0x1,_0x50c94a=_0x4dc52c[_0x5a357b(0xa9)][_0x5a357b(0xec)]()||'default';$gameSystem[_0x5a357b(0xab)](_0x5e1f08),$gameSystem['setChoiceListMaxRows'](_0x5465be),$gameSystem[_0x5a357b(0xf7)](_0x48f5d7),$gameSystem[_0x5a357b(0x28c)](_0x50c94a);}),PluginManager[_0x43c7f8(0x304)](pluginData[_0x43c7f8(0x140)],_0x43c7f8(0x1b7),_0x5911b3=>{const _0x4e5baa=_0x43c7f8;VisuMZ[_0x4e5baa(0x126)](_0x5911b3,_0x5911b3);const _0x4ae2c4=_0x5911b3[_0x4e5baa(0x17f)]||$gameSystem[_0x4e5baa(0x97)]()||0x1,_0x4c967c=_0x5911b3[_0x4e5baa(0x1a6)]||$gameSystem[_0x4e5baa(0x2f8)]()||0x1;$gameTemp[_0x4e5baa(0xd7)]=_0x5911b3[_0x4e5baa(0x313)]||![];const _0x475fae=_0x5911b3[_0x4e5baa(0x23b)]['toLowerCase']();$gameSystem[_0x4e5baa(0xd1)](_0x4ae2c4),$gameSystem['setMessageWindowWidth'](_0x4c967c);[_0x4e5baa(0xb0),_0x4e5baa(0x293)]['includes'](_0x475fae)&&$gameSystem['setMessageWindowWordWrap'](eval(_0x475fae));const _0x122055=SceneManager[_0x4e5baa(0x2e5)][_0x4e5baa(0xe4)];_0x122055&&(_0x122055[_0x4e5baa(0x240)](),_0x122055[_0x4e5baa(0x16d)](),_0x122055[_0x4e5baa(0x206)]());}),VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0xb5)]=Scene_Boot[_0x43c7f8(0x21c)][_0x43c7f8(0x1cb)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x28713a=_0x43c7f8;VisuMZ['MessageCore'][_0x28713a(0xb5)][_0x28713a(0x165)](this),this[_0x28713a(0x2e6)](),this[_0x28713a(0x1cd)](),this[_0x28713a(0xa3)](),this[_0x28713a(0xdc)]();},VisuMZ['MessageCore']['SortObjectByKeyLength']=function(_0x242c2c){const _0x407df7=_0x43c7f8,_0x27bc34=VisuMZ[_0x407df7(0x2fa)][_0x407df7(0x188)][_0x242c2c];_0x27bc34[_0x407df7(0xff)]((_0x490d78,_0x51879b)=>{const _0xe6d0b8=_0x407df7;if(_0xe6d0b8(0xe0)==='ccthN')return![];else{if(!_0x490d78||!_0x51879b)return-0x1;return _0x51879b['Match'][_0xe6d0b8(0x29c)]-_0x490d78['Match'][_0xe6d0b8(0x29c)];}});},Scene_Boot[_0x43c7f8(0x21c)][_0x43c7f8(0x2e6)]=function(){const _0x4e6e60=_0x43c7f8;VisuMZ['MessageCore'][_0x4e6e60(0x203)](_0x4e6e60(0x236));for(const _0x3b1da1 of VisuMZ['MessageCore']['Settings'][_0x4e6e60(0x236)]){if(_0x4e6e60(0xcb)===_0x4e6e60(0xcb)){_0x3b1da1[_0x4e6e60(0x1d1)]=_0x3b1da1['Match'][_0x4e6e60(0x26c)](),_0x3b1da1['textCodeCheck']=new RegExp('\x1b'+_0x3b1da1['Match'],'gi'),_0x3b1da1['textCodeResult']='\x1b'+_0x3b1da1['Match'];if(_0x3b1da1['Type']==='')_0x3b1da1[_0x4e6e60(0x11c)]+=_0x4e6e60(0x268);}else{_0x516e17['MessageCore'][_0x4e6e60(0x1a9)][_0x4e6e60(0x165)](this,_0x5924f5);const _0x58d96d=_0x3adeea['MessageCore'][_0x4e6e60(0x188)]['AutoColor'];_0x548d25[_0x4e6e60(0x2fa)][_0x4e6e60(0x311)](_0x22f62b,_0x58d96d['Items']);}}},Scene_Boot[_0x43c7f8(0x21c)][_0x43c7f8(0x1cd)]=function(){const _0x2d64d5=_0x43c7f8;VisuMZ[_0x2d64d5(0x2fa)][_0x2d64d5(0x203)]('TextCodeReplace');for(const _0x28960a of VisuMZ[_0x2d64d5(0x2fa)]['Settings']['TextCodeReplace']){_0x28960a[_0x2d64d5(0x2d4)]=new RegExp('\x1b'+_0x28960a[_0x2d64d5(0x1d1)]+_0x28960a[_0x2d64d5(0x27f)],'gi'),_0x28960a[_0x2d64d5(0x2ac)]!==''&&_0x28960a['TextStr']!==_0x2d64d5(0x9d)?_0x2d64d5(0x2d1)===_0x2d64d5(0x2d1)?_0x28960a[_0x2d64d5(0x11c)]=new Function(_0x2d64d5(0x1ac)+_0x28960a[_0x2d64d5(0x2ac)][_0x2d64d5(0x235)](/\\/g,'\x1b')+'\x27'):this[_0x2d64d5(0xe8)]&&(this[_0x2d64d5(0xe8)][_0x2d64d5(0xfe)]()?this[_0x2d64d5(0xe8)][_0x2d64d5(0x17e)]():this[_0x2d64d5(0x209)]()):_0x28960a[_0x2d64d5(0x11c)]=_0x28960a[_0x2d64d5(0x233)];}},Scene_Boot[_0x43c7f8(0x21c)][_0x43c7f8(0xa3)]=function(){const _0x78edd0=_0x43c7f8;for(const _0x1ddd4f of VisuMZ[_0x78edd0(0x2fa)][_0x78edd0(0x188)][_0x78edd0(0x18f)]){_0x78edd0(0x8b)==='PVowX'?_0x5f4cd5=_0x3ce44f[_0x78edd0(0x235)](/\\V\[(\d+)\]/gi,(_0xb1761f,_0x49407e)=>this[_0x78edd0(0x227)](_0x3f9d3c(_0x140a33[_0x78edd0(0x24a)](_0x39c290(_0x49407e))))):(_0x1ddd4f[_0x78edd0(0x2d4)]=new RegExp('\x5c['+_0x1ddd4f[_0x78edd0(0x1d1)]+'\x5c]','gi'),_0x1ddd4f[_0x78edd0(0x2ac)]!==''&&_0x1ddd4f[_0x78edd0(0x2ac)]!==_0x78edd0(0x9d)?_0x78edd0(0x2ed)!=='KtXvI'?_0x1ddd4f[_0x78edd0(0x11c)]=new Function(_0x78edd0(0x1ac)+_0x1ddd4f[_0x78edd0(0x2ac)]['replace'](/\\/g,'\x1b')+'\x27'):this[_0x78edd0(0x16c)]>0x0&&(this[_0x78edd0(0x2fb)]()&&(this['x']=this[_0x78edd0(0x27a)](this['x'],this[_0x78edd0(0x2c1)]),this['y']=this[_0x78edd0(0x27a)](this['y'],this['_moveTargetY']),this[_0x78edd0(0x137)]=this[_0x78edd0(0x27a)](this['width'],this[_0x78edd0(0x1f4)]),this['height']=this[_0x78edd0(0x27a)](this[_0x78edd0(0xb6)],this[_0x78edd0(0x1f2)]),this['clampPlacementPosition']()),this[_0x78edd0(0x16c)]--):_0x1ddd4f['textCodeResult']=_0x1ddd4f[_0x78edd0(0x233)]);}},Scene_Boot[_0x43c7f8(0x21c)][_0x43c7f8(0xdc)]=function(){const _0x25ab03=_0x43c7f8,_0x41bb6c=VisuMZ[_0x25ab03(0x2fa)]['Settings']['AutoColor'];if(!VisuMZ['ParseAllNotetags']){if(_0x25ab03(0x119)!==_0x25ab03(0x119))return _0x48e63b=_0x488b98[_0x25ab03(0x235)](/<B>/gi,_0x25ab03(0x298)),_0x130c27=_0x42f9f7[_0x25ab03(0x235)](/<\/B>/gi,_0x25ab03(0x16a)),_0x2b737c=_0x9218c1[_0x25ab03(0x235)](/<I>/gi,_0x25ab03(0x1a5)),_0x3d6970=_0x507d95['replace'](/<\/I>/gi,'\x1bITALIC[0]'),_0x3f2da8;else VisuMZ[_0x25ab03(0x2fa)][_0x25ab03(0x19b)]($dataClasses,_0x41bb6c['Classes']),VisuMZ[_0x25ab03(0x2fa)][_0x25ab03(0x19b)]($dataSkills,_0x41bb6c['Skills']),VisuMZ[_0x25ab03(0x2fa)][_0x25ab03(0x19b)]($dataItems,_0x41bb6c[_0x25ab03(0x114)]),VisuMZ[_0x25ab03(0x2fa)][_0x25ab03(0x19b)]($dataWeapons,_0x41bb6c['Weapons']),VisuMZ[_0x25ab03(0x2fa)][_0x25ab03(0x19b)]($dataArmors,_0x41bb6c[_0x25ab03(0x21b)]),VisuMZ[_0x25ab03(0x2fa)][_0x25ab03(0x19b)]($dataEnemies,_0x41bb6c[_0x25ab03(0x2a0)]),VisuMZ[_0x25ab03(0x2fa)][_0x25ab03(0x19b)]($dataStates,_0x41bb6c['States']);}VisuMZ['MessageCore'][_0x25ab03(0x2be)]();},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x19e)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x43c7f8(0x282),_0x43c7f8(0x245),_0x43c7f8(0x135),_0x43c7f8(0x2c3),_0x43c7f8(0x18c),_0x43c7f8(0x197),'<CENTER>','</CENTER>',_0x43c7f8(0x90),_0x43c7f8(0x10c),'<COLORLOCK>',_0x43c7f8(0x2a8),'(((',_0x43c7f8(0x150),_0x43c7f8(0x1c9),'</WORDWRAP>',_0x43c7f8(0x79),_0x43c7f8(0x139),_0x43c7f8(0x24e),_0x43c7f8(0x72),_0x43c7f8(0xb3),_0x43c7f8(0x77),_0x43c7f8(0x303),_0x43c7f8(0x181),_0x43c7f8(0x25d),_0x43c7f8(0x14d),'SWITCH','SWITCHES','ALL',_0x43c7f8(0x30c)],VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x19b)]=function(_0x59d0ad,_0x5bb480){const _0x3fd513=_0x43c7f8;if(_0x5bb480<=0x0)return;const _0x2db7aa=_0x59d0ad;for(const _0x209442 of _0x2db7aa){if('QfcBo'===_0x3fd513(0x178)){if(!_0x209442)continue;VisuMZ[_0x3fd513(0x2fa)][_0x3fd513(0x311)](_0x209442,_0x5bb480);}else{for(const _0x3e61d5 of _0x53639f['MessageCore'][_0x3fd513(0x188)][_0x3fd513(0x236)]){_0xec24b2['match'](_0x3e61d5[_0x3fd513(0x2d4)])&&(_0x85358c=_0x313431[_0x3fd513(0x235)](_0x3e61d5[_0x3fd513(0x2d4)],_0x3e61d5[_0x3fd513(0x11c)]),_0x41f12a=this[_0x3fd513(0x2d9)](_0x5a4009));}return _0x45f4a2;}}},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x2be)]=function(){const _0x2e92db=_0x43c7f8;VisuMZ[_0x2e92db(0x2fa)][_0x2e92db(0x2c4)]=[];for(let _0x158166=0x1;_0x158166<=0x1f;_0x158166++){const _0x4befcb=_0x2e92db(0x8a)['format'](_0x158166),_0x4635fa=VisuMZ[_0x2e92db(0x2fa)][_0x2e92db(0x188)][_0x2e92db(0x263)][_0x4befcb];_0x4635fa[_0x2e92db(0xff)]((_0x387645,_0x2ade58)=>{const _0x42a9d4=_0x2e92db;if('iCsMd'===_0x42a9d4(0x295))this['_lastGainedItemData']={'type':0x0,'id':0x0,'quantity':0x0};else{if(!_0x387645||!_0x2ade58)return-0x1;return _0x2ade58[_0x42a9d4(0x29c)]-_0x387645[_0x42a9d4(0x29c)];}}),this['CreateAutoColorRegExpListEntries'](_0x4635fa,_0x158166);}},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x104)]=function(_0x4b3cf0,_0x24b377){const _0x45c62c=_0x43c7f8;for(const _0xdc908e of _0x4b3cf0){if('JkAUK'===_0x45c62c(0x2ec))this[_0x45c62c(0x2f0)][_0x53b509][_0x45c62c(0x20c)][0x1]=_0x47d09c[_0x45c62c(0x20c)][0x1];else{if(_0xdc908e[_0x45c62c(0x29c)]<=0x0)continue;if(/^\d+$/[_0x45c62c(0x1e7)](_0xdc908e))continue;let _0x4b82fe=VisuMZ[_0x45c62c(0x2fa)][_0x45c62c(0x157)](_0xdc908e);if(_0xdc908e[_0x45c62c(0x30d)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0xe80d03=new RegExp(_0x4b82fe,'i');else var _0xe80d03=new RegExp('\x5cb'+_0x4b82fe+'\x5cb','g');VisuMZ[_0x45c62c(0x2fa)][_0x45c62c(0x2c4)]['push']([_0xe80d03,_0x45c62c(0x147)[_0x45c62c(0xdf)](_0x24b377,_0xdc908e)]);}}},VisuMZ['MessageCore'][_0x43c7f8(0x157)]=function(_0x11bf85){const _0xf055b8=_0x43c7f8;return _0x11bf85=_0x11bf85[_0xf055b8(0x235)](/(\W)/gi,(_0x4c195a,_0x33dbe9)=>_0xf055b8(0x2f6)[_0xf055b8(0xdf)](_0x33dbe9)),_0x11bf85;},VisuMZ['MessageCore']['ParseClassNotetags']=VisuMZ[_0x43c7f8(0x88)],VisuMZ[_0x43c7f8(0x88)]=function(_0x1e9a9b){const _0x5aa153=_0x43c7f8;VisuMZ['MessageCore'][_0x5aa153(0x88)][_0x5aa153(0x165)](this,_0x1e9a9b);const _0x1300b9=VisuMZ[_0x5aa153(0x2fa)][_0x5aa153(0x188)][_0x5aa153(0x263)];VisuMZ['MessageCore'][_0x5aa153(0x311)](_0x1e9a9b,_0x1300b9[_0x5aa153(0x195)]);},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x136)]=VisuMZ[_0x43c7f8(0x136)],VisuMZ[_0x43c7f8(0x136)]=function(_0x56ff7b){const _0x245ad3=_0x43c7f8;VisuMZ['MessageCore'][_0x245ad3(0x136)][_0x245ad3(0x165)](this,_0x56ff7b);const _0x5cc26e=VisuMZ['MessageCore'][_0x245ad3(0x188)][_0x245ad3(0x263)];VisuMZ[_0x245ad3(0x2fa)][_0x245ad3(0x311)](_0x56ff7b,_0x5cc26e[_0x245ad3(0x29d)]);},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x1a9)]=VisuMZ[_0x43c7f8(0x1a9)],VisuMZ[_0x43c7f8(0x1a9)]=function(_0x36586e){const _0x1ea8c5=_0x43c7f8;VisuMZ[_0x1ea8c5(0x2fa)][_0x1ea8c5(0x1a9)][_0x1ea8c5(0x165)](this,_0x36586e);const _0x428baf=VisuMZ['MessageCore'][_0x1ea8c5(0x188)][_0x1ea8c5(0x263)];VisuMZ[_0x1ea8c5(0x2fa)][_0x1ea8c5(0x311)](_0x36586e,_0x428baf[_0x1ea8c5(0x114)]);},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x1f8)]=VisuMZ[_0x43c7f8(0x1f8)],VisuMZ['ParseWeaponNotetags']=function(_0x567704){const _0x4ee989=_0x43c7f8;VisuMZ[_0x4ee989(0x2fa)][_0x4ee989(0x1f8)][_0x4ee989(0x165)](this,_0x567704);const _0x501fba=VisuMZ[_0x4ee989(0x2fa)]['Settings'][_0x4ee989(0x263)];VisuMZ[_0x4ee989(0x2fa)][_0x4ee989(0x311)](_0x567704,_0x501fba[_0x4ee989(0x94)]);},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x1a2)]=VisuMZ[_0x43c7f8(0x1a2)],VisuMZ[_0x43c7f8(0x1a2)]=function(_0x12762f){const _0x36336c=_0x43c7f8;VisuMZ[_0x36336c(0x2fa)][_0x36336c(0x1a2)][_0x36336c(0x165)](this,_0x12762f);const _0x2c03a6=VisuMZ['MessageCore'][_0x36336c(0x188)][_0x36336c(0x263)];VisuMZ['MessageCore'][_0x36336c(0x311)](_0x12762f,_0x2c03a6[_0x36336c(0x21b)]);},VisuMZ[_0x43c7f8(0x2fa)]['ParseEnemyNotetags']=VisuMZ[_0x43c7f8(0x12f)],VisuMZ['ParseEnemyNotetags']=function(_0x55cc0d){const _0x3bb501=_0x43c7f8;VisuMZ['MessageCore'][_0x3bb501(0x12f)]['call'](this,_0x55cc0d);const _0x37b52e=VisuMZ[_0x3bb501(0x2fa)][_0x3bb501(0x188)][_0x3bb501(0x263)];VisuMZ[_0x3bb501(0x2fa)][_0x3bb501(0x311)](_0x55cc0d,_0x37b52e[_0x3bb501(0x2a0)]);},VisuMZ[_0x43c7f8(0x2fa)]['ParseStateNotetags']=VisuMZ[_0x43c7f8(0x115)],VisuMZ[_0x43c7f8(0x115)]=function(_0x1520cd){const _0x5c78f1=_0x43c7f8;VisuMZ[_0x5c78f1(0x2fa)][_0x5c78f1(0x115)][_0x5c78f1(0x165)](this,_0x1520cd);const _0x53c46e=VisuMZ[_0x5c78f1(0x2fa)][_0x5c78f1(0x188)]['AutoColor'];VisuMZ[_0x5c78f1(0x2fa)][_0x5c78f1(0x311)](_0x1520cd,_0x53c46e[_0x5c78f1(0x92)]);},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x311)]=function(_0xc23cd1,_0x106ee4){const _0xbb0579=_0x43c7f8;if(_0x106ee4<=0x0)return;const _0x272fbd=VisuMZ[_0xbb0579(0x2fa)][_0xbb0579(0x188)][_0xbb0579(0x263)]['TextColor'+_0x106ee4];let _0x269fac=_0xc23cd1['name'][_0xbb0579(0x2b2)]();if(/^\d+$/[_0xbb0579(0x1e7)](_0x269fac))return;if(VisuMZ[_0xbb0579(0x2fa)][_0xbb0579(0x19e)][_0xbb0579(0x123)](_0x269fac[_0xbb0579(0x26c)]()))return;_0x269fac=_0x269fac['replace'](/\\I\[(\d+)\]/gi,''),_0x269fac=_0x269fac['replace'](/\x1bI\[(\d+)\]/gi,'');if(_0x269fac['length']<=0x0)return;if(_0x269fac[_0xbb0579(0x30d)](/-----/i))return;_0x272fbd['push'](_0x269fac);},SceneManager['isSceneBattle']=function(){const _0x9d0581=_0x43c7f8;return this[_0x9d0581(0x2e5)]&&this[_0x9d0581(0x2e5)][_0x9d0581(0x1af)]===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x5c4d66=_0x43c7f8;return this['_scene']&&this[_0x5c4d66(0x2e5)][_0x5c4d66(0x1af)]===Scene_Map;},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x1da)]=TextManager[_0x43c7f8(0xa2)],TextManager[_0x43c7f8(0xa2)]=function(_0x10c55f){const _0x562193=_0x43c7f8,_0x50a2c6=['levelUp','emerge','preemptive',_0x562193(0x300),_0x562193(0x1e9),_0x562193(0xde),'escapeStart',_0x562193(0x28e),_0x562193(0x21f),_0x562193(0x102)];let _0x55a57d=VisuMZ['MessageCore'][_0x562193(0x1da)][_0x562193(0x165)](this,_0x10c55f);return _0x50a2c6['includes'](_0x10c55f)&&(_0x55a57d=_0x562193(0x198)+_0x55a57d),_0x55a57d;},ConfigManager[_0x43c7f8(0x167)]=VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x188)][_0x43c7f8(0x2db)]['Default'],VisuMZ['MessageCore'][_0x43c7f8(0x260)]=ConfigManager[_0x43c7f8(0x15f)],ConfigManager[_0x43c7f8(0x15f)]=function(){const _0xbc17be=_0x43c7f8,_0x50bd47=VisuMZ[_0xbc17be(0x2fa)][_0xbc17be(0x260)][_0xbc17be(0x165)](this);return _0x50bd47[_0xbc17be(0x167)]=this[_0xbc17be(0x167)],_0x50bd47;},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x148)]=ConfigManager[_0x43c7f8(0x20e)],ConfigManager[_0x43c7f8(0x20e)]=function(_0x1f3854){const _0x526117=_0x43c7f8;VisuMZ[_0x526117(0x2fa)]['ConfigManager_applyData'][_0x526117(0x165)](this,_0x1f3854);if(_0x526117(0x167)in _0x1f3854){if(_0x526117(0xca)!==_0x526117(0x2eb))this[_0x526117(0x167)]=Number(_0x1f3854['textSpeed'])[_0x526117(0x7d)](0x1,0xb);else{if(!_0x2058a8||!_0x43ae31)return-0x1;return _0x324ca1['Match'][_0x526117(0x29c)]-_0x232d2b['Match'][_0x526117(0x29c)];}}else _0x526117(0x2cd)!=='EgXhl'?this['textSpeed']=VisuMZ[_0x526117(0x2fa)][_0x526117(0x188)][_0x526117(0x2db)]['Default']:_0x2d7f6f['x']-=_0x32a605[_0x526117(0x87)]/0x2;},TextManager[_0x43c7f8(0x2d7)]=VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x188)][_0x43c7f8(0x2db)][_0x43c7f8(0xd8)],TextManager[_0x43c7f8(0x1cc)]=VisuMZ['MessageCore'][_0x43c7f8(0x188)][_0x43c7f8(0x2db)][_0x43c7f8(0x25b)],VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x130)]=Game_System[_0x43c7f8(0x21c)][_0x43c7f8(0x1bc)],Game_System[_0x43c7f8(0x21c)][_0x43c7f8(0x1bc)]=function(){const _0x469d62=_0x43c7f8;VisuMZ[_0x469d62(0x2fa)]['Game_System_initialize'][_0x469d62(0x165)](this),this[_0x469d62(0x30f)]();},Game_System[_0x43c7f8(0x21c)][_0x43c7f8(0x30f)]=function(){const _0x2948a6=_0x43c7f8,_0x5caf73=VisuMZ['MessageCore'][_0x2948a6(0x188)][_0x2948a6(0x1e5)],_0x1fe5eb=VisuMZ[_0x2948a6(0x2fa)][_0x2948a6(0x188)][_0x2948a6(0x23b)];this[_0x2948a6(0x1d3)]={'messageRows':_0x5caf73['MessageRows'],'messageWidth':_0x5caf73[_0x2948a6(0x1a3)],'messageWordWrap':_0x1fe5eb[_0x2948a6(0xce)],'helpWordWrap':_0x1fe5eb[_0x2948a6(0x1d6)],'choiceLineHeight':_0x5caf73[_0x2948a6(0x1dc)],'choiceRows':_0x5caf73[_0x2948a6(0x7a)],'choiceCols':_0x5caf73[_0x2948a6(0x192)],'choiceTextAlign':_0x5caf73[_0x2948a6(0xb9)]};},Game_System[_0x43c7f8(0x21c)][_0x43c7f8(0x97)]=function(){const _0x1b9bce=_0x43c7f8;if(this[_0x1b9bce(0x1d3)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x1b9bce(0x1de)]===undefined)this[_0x1b9bce(0x30f)]();return this[_0x1b9bce(0x1d3)][_0x1b9bce(0x1de)];},Game_System[_0x43c7f8(0x21c)]['setMessageWindowRows']=function(_0x2b572b){const _0x16b811=_0x43c7f8;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x16b811(0x1d3)][_0x16b811(0x1de)]===undefined)this[_0x16b811(0x30f)]();this['_MessageCoreSettings']['messageRows']=_0x2b572b||0x1;},Game_System[_0x43c7f8(0x21c)]['getMessageWindowWidth']=function(){const _0x12a83f=_0x43c7f8;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x12a83f(0x266)]===undefined)this[_0x12a83f(0x30f)]();return this[_0x12a83f(0x1d3)]['messageWidth'];},Game_System['prototype']['setMessageWindowWidth']=function(_0x3a0cdf){const _0xc44a3f=_0x43c7f8;if(this[_0xc44a3f(0x1d3)]===undefined)this['initMessageCore']();if(this[_0xc44a3f(0x1d3)][_0xc44a3f(0x266)]===undefined)this[_0xc44a3f(0x30f)]();_0x3a0cdf=Math[_0xc44a3f(0x193)](_0x3a0cdf);if(_0x3a0cdf%0x2!==0x0)_0x3a0cdf+=0x1;this[_0xc44a3f(0x1d3)][_0xc44a3f(0x266)]=_0x3a0cdf||0x2;},Game_System[_0x43c7f8(0x21c)][_0x43c7f8(0x2e4)]=function(){const _0x478562=_0x43c7f8;if(this[_0x478562(0x1d3)]===undefined)this[_0x478562(0x30f)]();if(this[_0x478562(0x1d3)][_0x478562(0x2c7)]===undefined)this[_0x478562(0x30f)]();return this[_0x478562(0x1d3)][_0x478562(0x2c7)];},Game_System[_0x43c7f8(0x21c)][_0x43c7f8(0x2b0)]=function(_0x2b382a){const _0x906076=_0x43c7f8;if(this[_0x906076(0x1d3)]===undefined)this['initMessageCore']();if(this[_0x906076(0x1d3)]['messageWordWrap']===undefined)this[_0x906076(0x30f)]();this[_0x906076(0x1d3)][_0x906076(0x2c7)]=_0x2b382a;},Game_System[_0x43c7f8(0x21c)][_0x43c7f8(0x289)]=function(){const _0x5bba98=_0x43c7f8;if(this[_0x5bba98(0x1d3)]===undefined)this['initMessageCore']();if(this[_0x5bba98(0x1d3)][_0x5bba98(0x30b)]===undefined)this[_0x5bba98(0x30f)]();return this['_MessageCoreSettings'][_0x5bba98(0x30b)];},Game_System[_0x43c7f8(0x21c)][_0x43c7f8(0x2d8)]=function(_0x22cf9a){const _0x27ada3=_0x43c7f8;if(this[_0x27ada3(0x1d3)]===undefined)this[_0x27ada3(0x30f)]();if(this[_0x27ada3(0x1d3)][_0x27ada3(0x30b)]===undefined)this[_0x27ada3(0x30f)]();this[_0x27ada3(0x1d3)][_0x27ada3(0x30b)]=_0x22cf9a;},Game_System['prototype'][_0x43c7f8(0x142)]=function(){const _0x3cc979=_0x43c7f8;if(this[_0x3cc979(0x1d3)]===undefined)this['initMessageCore']();if(this[_0x3cc979(0x1d3)][_0x3cc979(0xbe)]===undefined)this[_0x3cc979(0x30f)]();return this[_0x3cc979(0x1d3)][_0x3cc979(0xbe)];},Game_System['prototype'][_0x43c7f8(0xab)]=function(_0x377642){const _0x4d4e53=_0x43c7f8;if(this['_MessageCoreSettings']===undefined)this[_0x4d4e53(0x30f)]();if(this[_0x4d4e53(0x1d3)][_0x4d4e53(0xbe)]===undefined)this[_0x4d4e53(0x30f)]();this[_0x4d4e53(0x1d3)]['choiceLineHeight']=_0x377642||0x1;},Game_System['prototype'][_0x43c7f8(0x8d)]=function(){const _0x5bdbc4=_0x43c7f8;if(this[_0x5bdbc4(0x1d3)]===undefined)this[_0x5bdbc4(0x30f)]();if(this[_0x5bdbc4(0x1d3)][_0x5bdbc4(0x9b)]===undefined)this['initMessageCore']();return this['_MessageCoreSettings']['choiceRows'];},Game_System[_0x43c7f8(0x21c)][_0x43c7f8(0xef)]=function(_0x42ca0f){const _0x1918d7=_0x43c7f8;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x1918d7(0x9b)]===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x1918d7(0x9b)]=_0x42ca0f||0x1;},Game_System[_0x43c7f8(0x21c)][_0x43c7f8(0xaf)]=function(){const _0x3a6601=_0x43c7f8;if(this[_0x3a6601(0x1d3)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x3a6601(0x2ab)]===undefined)this['initMessageCore']();return this[_0x3a6601(0x1d3)][_0x3a6601(0x2ab)];},Game_System[_0x43c7f8(0x21c)][_0x43c7f8(0xf7)]=function(_0x52932d){const _0xc40225=_0x43c7f8;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0xc40225(0x1d3)][_0xc40225(0x2ab)]===undefined)this['initMessageCore']();this[_0xc40225(0x1d3)][_0xc40225(0x2ab)]=_0x52932d||0x1;},Game_System[_0x43c7f8(0x21c)][_0x43c7f8(0x204)]=function(){const _0x2c036a=_0x43c7f8;if(this[_0x2c036a(0x1d3)]===undefined)this[_0x2c036a(0x30f)]();if(this[_0x2c036a(0x1d3)][_0x2c036a(0x1fc)]===undefined)this[_0x2c036a(0x30f)]();return this['_MessageCoreSettings'][_0x2c036a(0x1fc)];},Game_System['prototype'][_0x43c7f8(0x28c)]=function(_0x204793){const _0x20fa6b=_0x43c7f8;if(this[_0x20fa6b(0x1d3)]===undefined)this[_0x20fa6b(0x30f)]();if(this[_0x20fa6b(0x1d3)][_0x20fa6b(0x1fc)]===undefined)this[_0x20fa6b(0x30f)]();this[_0x20fa6b(0x1d3)]['choiceTextAlign']=_0x204793[_0x20fa6b(0xec)]();},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x11e)]=Game_Party[_0x43c7f8(0x21c)][_0x43c7f8(0x1bc)],Game_Party[_0x43c7f8(0x21c)][_0x43c7f8(0x1bc)]=function(){const _0x3e4c67=_0x43c7f8;VisuMZ[_0x3e4c67(0x2fa)][_0x3e4c67(0x11e)][_0x3e4c67(0x165)](this),this[_0x3e4c67(0x30f)]();},Game_Party[_0x43c7f8(0x21c)][_0x43c7f8(0x30f)]=function(){const _0x93d6cf=_0x43c7f8;this[_0x93d6cf(0x164)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party['prototype'][_0x43c7f8(0x1d4)]=function(){const _0x1ec062=_0x43c7f8;if(this[_0x1ec062(0x164)]===undefined)this[_0x1ec062(0x30f)]();return this[_0x1ec062(0x164)];},Game_Party[_0x43c7f8(0x21c)][_0x43c7f8(0x28f)]=function(_0x4dd61e,_0x56eb99){const _0x1565ec=_0x43c7f8;if(this['_lastGainedItemData']===undefined)this['initMessageCore']();if(!_0x4dd61e)return;if(DataManager[_0x1565ec(0xe9)](_0x4dd61e))_0x1565ec(0x13e)!==_0x1565ec(0x13e)?_0x4d5c1b['y']+=_0x94a78b['startY']:this[_0x1565ec(0x164)][_0x1565ec(0x10b)]=0x0;else{if(DataManager[_0x1565ec(0x208)](_0x4dd61e)){if(_0x1565ec(0x29f)!==_0x1565ec(0x18d))this['_lastGainedItemData'][_0x1565ec(0x10b)]=0x1;else return _0x52ed77;}else DataManager[_0x1565ec(0x120)](_0x4dd61e)&&(this['_lastGainedItemData'][_0x1565ec(0x10b)]=0x2);}this[_0x1565ec(0x164)]['id']=_0x4dd61e['id'],this['_lastGainedItemData'][_0x1565ec(0x244)]=_0x56eb99;},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x14e)]=Game_Party['prototype'][_0x43c7f8(0x8e)],Game_Party[_0x43c7f8(0x21c)]['gainItem']=function(_0x104592,_0x871e53,_0x2300b8){const _0x2942a6=_0x43c7f8;VisuMZ[_0x2942a6(0x2fa)][_0x2942a6(0x14e)][_0x2942a6(0x165)](this,_0x104592,_0x871e53,_0x2300b8);if(_0x871e53>0x0){if(_0x2942a6(0x100)!==_0x2942a6(0x100)){let _0x55d675=_0x38e9fd['text'];this[_0x2942a6(0x2f3)]={};if(this[_0x2942a6(0x25a)]())return _0x55d675;_0x55d675=_0x55d675[_0x2942a6(0x235)](/<POSITION:[ ]*(.*)>/gi,(_0x421f94,_0x172044)=>{const _0x1cba74=_0x2942a6,_0x1c7428=_0x172044[_0x1cba74(0xfd)](',')[_0x1cba74(0x172)](_0x59b155=>_0x3d5e88(_0x59b155)||0x0);if(_0x1c7428[0x0]!==_0x3f3848)this[_0x1cba74(0x2f3)]['x']=_0x301183(_0x1c7428[0x0]);if(_0x1c7428[0x1]!==_0x1026eb)this[_0x1cba74(0x2f3)]['y']=_0x45e276(_0x1c7428[0x1]);if(_0x1c7428[0x2]!==_0x301166)this[_0x1cba74(0x2f3)][_0x1cba74(0x137)]=_0x3781d9(_0x1c7428[0x2]);if(_0x1c7428[0x3]!==_0x3e2115)this[_0x1cba74(0x2f3)]['height']=_0x541d10(_0x1c7428[0x3]);return'';}),_0x55d675=_0x55d675[_0x2942a6(0x235)](/<COORDINATES:[ ]*(.*)>/gi,(_0x21aa4b,_0x5cd4bc)=>{const _0x35506c=_0x2942a6,_0x24f160=_0x5cd4bc[_0x35506c(0xfd)](',')[_0x35506c(0x172)](_0x1c9e58=>_0x15c77b(_0x1c9e58)||0x0);if(_0x24f160[0x0]!==_0x41d5df)this[_0x35506c(0x2f3)]['x']=_0x25b67b(_0x24f160[0x0]);if(_0x24f160[0x1]!==_0x265dbe)this[_0x35506c(0x2f3)]['y']=_0x141297(_0x24f160[0x1]);return'';}),_0x55d675=_0x55d675[_0x2942a6(0x235)](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x1e9b60,_0x344d87)=>{const _0xb2467a=_0x2942a6,_0x2f208b=_0x344d87[_0xb2467a(0xfd)](',')[_0xb2467a(0x172)](_0x53e59c=>_0x67642f(_0x53e59c)||0x0);if(_0x2f208b[0x0]!==_0x159903)this[_0xb2467a(0x2f3)][_0xb2467a(0x137)]=_0x391903(_0x2f208b[0x2]);if(_0x2f208b[0x1]!==_0x24462a)this[_0xb2467a(0x2f3)][_0xb2467a(0xb6)]=_0x36da1c(_0x2f208b[0x3]);return'';}),_0x5d8545[_0x2942a6(0x186)]=_0x55d675;}else this[_0x2942a6(0x28f)](_0x104592,_0x871e53);}},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x12d)]=Game_Map['prototype'][_0x43c7f8(0x1bc)],Game_Map[_0x43c7f8(0x21c)]['initialize']=function(){const _0x1983d4=_0x43c7f8;VisuMZ['MessageCore'][_0x1983d4(0x12d)][_0x1983d4(0x165)](this),this['_messageCommonEvents']=[];},VisuMZ['MessageCore'][_0x43c7f8(0xc9)]=Game_Map['prototype']['setupEvents'],Game_Map['prototype'][_0x43c7f8(0x15d)]=function(){const _0x233ca1=_0x43c7f8;VisuMZ[_0x233ca1(0x2fa)]['Game_Map_setupEvents'][_0x233ca1(0x165)](this),this['_messageCommonEvents']=[];},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x219)]=Game_Map[_0x43c7f8(0x21c)][_0x43c7f8(0xc7)],Game_Map[_0x43c7f8(0x21c)][_0x43c7f8(0xc7)]=function(){const _0x206b13=_0x43c7f8;VisuMZ[_0x206b13(0x2fa)][_0x206b13(0x219)][_0x206b13(0x165)](this),this['updateMessageCommonEvents']();},Game_Map['prototype'][_0x43c7f8(0x141)]=function(_0x495a3e){const _0x59b7ce=_0x43c7f8;if(!$dataCommonEvents[_0x495a3e])return;this['_messageCommonEvents']=this['_messageCommonEvents']||[];const _0xd3bb1f=this['_interpreter']['_eventId'],_0x4fc4bd=new Game_MessageCommonEvent(_0x495a3e,_0xd3bb1f);this[_0x59b7ce(0x74)]['push'](_0x4fc4bd);},Game_Map[_0x43c7f8(0x21c)]['updateMessageCommonEvents']=function(){const _0x4c50d7=_0x43c7f8;this[_0x4c50d7(0x74)]=this['_messageCommonEvents']||[];for(const _0x27e47f of this['_messageCommonEvents']){if(!_0x27e47f[_0x4c50d7(0xe8)]){if(_0x4c50d7(0x179)!=='UYjFa'){if(this[_0x4c50d7(0x1d3)]===_0x32e398)this[_0x4c50d7(0x30f)]();if(this[_0x4c50d7(0x1d3)][_0x4c50d7(0x1fc)]===_0x107b0e)this['initMessageCore']();this[_0x4c50d7(0x1d3)][_0x4c50d7(0x1fc)]=_0x3fb501[_0x4c50d7(0xec)]();}else this[_0x4c50d7(0x74)][_0x4c50d7(0x222)](_0x27e47f);}else _0x4c50d7(0x1d9)!==_0x4c50d7(0x22a)?_0x27e47f[_0x4c50d7(0x17e)]():(_0x189e59[_0x4c50d7(0x2fa)][_0x4c50d7(0x12d)][_0x4c50d7(0x165)](this),this[_0x4c50d7(0x74)]=[]);}},Game_Interpreter['prototype'][_0x43c7f8(0x305)]=function(_0x598ba0){const _0x4f2c3f=_0x43c7f8;if($gameMessage[_0x4f2c3f(0x23f)]())return![];return this['prepareShowTextCommand'](_0x598ba0),this[_0x4f2c3f(0x25c)](_0x598ba0),this['prepareShowTextFollowups'](_0x598ba0),this[_0x4f2c3f(0x16f)](_0x4f2c3f(0xa2)),!![];},Game_Interpreter[_0x43c7f8(0x21c)][_0x43c7f8(0x1ce)]=function(_0x51ce10){const _0x21f065=_0x43c7f8;$gameMessage[_0x21f065(0x1d8)](_0x51ce10[0x0],_0x51ce10[0x1]),$gameMessage[_0x21f065(0xc2)](_0x51ce10[0x2]),$gameMessage['setPositionType'](_0x51ce10[0x3]),$gameMessage[_0x21f065(0xe1)](_0x51ce10[0x4]);},Game_Interpreter[_0x43c7f8(0x21c)][_0x43c7f8(0x25c)]=function(_0x430fdf){const _0x35ad8e=_0x43c7f8;while(this[_0x35ad8e(0x261)]()){if(_0x35ad8e(0x1ab)!==_0x35ad8e(0xb8)){this['_index']++;this[_0x35ad8e(0x2a7)]()[_0x35ad8e(0x257)]===0x191&&$gameMessage[_0x35ad8e(0x1aa)](this[_0x35ad8e(0x2a7)]()[_0x35ad8e(0x20c)][0x0]);if(this['isBreakShowTextCommands']())break;}else{if(!this['_autoPositionTarget'])return;const _0x3a70fe=_0x3c6e3d['_scene'];if(!_0x3a70fe)return;if(!_0x3a70fe['_spriteset'])return;const _0x4bf2cb=_0x3a70fe[_0x35ad8e(0x112)][_0x35ad8e(0x146)](this['_autoPositionTarget']);if(!_0x4bf2cb)return;let _0xfdee9b=_0x4bf2cb['x'];_0xfdee9b-=this[_0x35ad8e(0x137)]/0x2,_0xfdee9b-=(_0x5985fb[_0x35ad8e(0x137)]-_0x37c4c2[_0x35ad8e(0x2a2)])/0x2;let _0x38a8db=_0x4bf2cb['y'];_0x38a8db-=this[_0x35ad8e(0xb6)],_0x38a8db-=(_0x124e89[_0x35ad8e(0xb6)]-_0x4ce1e1[_0x35ad8e(0xaa)])/0x2,_0x38a8db-=_0x4bf2cb[_0x35ad8e(0xb6)]+0x8,this['x']=_0x58aa32[_0x35ad8e(0xd4)](_0xfdee9b),this['y']=_0x240c0d[_0x35ad8e(0xd4)](_0x38a8db),this[_0x35ad8e(0x264)](!![],![]),this[_0x35ad8e(0x262)][_0x35ad8e(0xba)]();}}},Game_Interpreter['prototype'][_0x43c7f8(0x261)]=function(){const _0x1dff7f=_0x43c7f8;return this[_0x1dff7f(0x1a0)]()===0x65&&$gameSystem[_0x1dff7f(0x97)]()>0x4?_0x1dff7f(0x1b6)===_0x1dff7f(0xcc)?_0x4ed18b[_0x1dff7f(0x8d)]():!![]:_0x1dff7f(0x1cf)!==_0x1dff7f(0x191)?this[_0x1dff7f(0x1a0)]()===0x191:(_0x48bc77=_0x5306be['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x20518a=_0x3d7287[_0x1dff7f(0x235)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x1e3283=_0x219d96[_0x1dff7f(0x235)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x228234);},Game_Interpreter[_0x43c7f8(0x21c)][_0x43c7f8(0xc8)]=function(){const _0x6152b0=_0x43c7f8;return $gameMessage[_0x6152b0(0x16e)][_0x6152b0(0x29c)]>=$gameSystem[_0x6152b0(0x97)]()&&this[_0x6152b0(0x1a0)]()!==0x191;},Game_Interpreter[_0x43c7f8(0x21c)][_0x43c7f8(0x1e8)]=function(_0x42e332){const _0x19b0b4=_0x43c7f8;switch(this[_0x19b0b4(0x1a0)]()){case 0x66:this[_0x19b0b4(0x1fe)]++,this[_0x19b0b4(0x127)](this[_0x19b0b4(0x2a7)]()['parameters']);break;case 0x67:this['_index']++,this[_0x19b0b4(0x12c)](this[_0x19b0b4(0x2a7)]()[_0x19b0b4(0x20c)]);break;case 0x68:this[_0x19b0b4(0x1fe)]++,this[_0x19b0b4(0x27e)](this[_0x19b0b4(0x2a7)]()['parameters']);break;}},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0xf9)]=Game_Interpreter['prototype'][_0x43c7f8(0x127)],Game_Interpreter[_0x43c7f8(0x21c)][_0x43c7f8(0x127)]=function(_0xd2f23e){const _0x50d662=_0x43c7f8;_0xd2f23e=this[_0x50d662(0x29a)](),VisuMZ[_0x50d662(0x2fa)]['Game_Interpreter_setupChoices'][_0x50d662(0x165)](this,_0xd2f23e);},Game_Interpreter[_0x43c7f8(0x21c)][_0x43c7f8(0x29a)]=function(){const _0x13b2c6=_0x43c7f8,_0x2a788b=this['_index'],_0x36fa7f=[];let _0x29e53e=0x0;this[_0x13b2c6(0x1fe)]++;while(this['_index']<this['_list']['length']){if(this['currentCommand']()[_0x13b2c6(0x1b1)]===this[_0x13b2c6(0xfc)]){if(_0x13b2c6(0x23e)==='PUFYd')this['updatePlacement'](),this[_0x13b2c6(0xb7)]();else{if(this[_0x13b2c6(0x2a7)]()[_0x13b2c6(0x257)]===0x194&&this[_0x13b2c6(0x1a0)]()!==0x66)break;else{if(this['currentCommand']()['code']===0x66){if(_0x13b2c6(0x24c)!==_0x13b2c6(0x24c)){const _0xbbc78c=_0x4db369[_0x13b2c6(0x22f)]('['+_0x235ad5['$1'][_0x13b2c6(0x30d)](/\d+/g)+']');for(const _0x7b392c of _0xbbc78c){if(!_0x26f14e[_0x13b2c6(0x24a)](_0x7b392c))return![];}return!![];}else this[_0x13b2c6(0x265)](_0x29e53e,this[_0x13b2c6(0x2a7)](),_0x2a788b),this[_0x13b2c6(0x1fe)]-=0x2;}else this['currentCommand']()[_0x13b2c6(0x257)]===0x192&&(this['currentCommand']()['parameters'][0x0]=_0x29e53e,_0x29e53e++);}}}this[_0x13b2c6(0x1fe)]++;}return this[_0x13b2c6(0x1fe)]=_0x2a788b,this[_0x13b2c6(0x2a7)]()[_0x13b2c6(0x20c)];},Game_Interpreter['prototype'][_0x43c7f8(0x265)]=function(_0x29b21b,_0x53d7e8,_0x3eadf0){const _0x5a27cc=_0x43c7f8;this[_0x5a27cc(0x1d5)](_0x29b21b,_0x53d7e8,_0x3eadf0),this[_0x5a27cc(0x1b9)](_0x29b21b,_0x53d7e8,_0x3eadf0),this['addExtraShowChoices'](_0x53d7e8,_0x3eadf0);},Game_Interpreter[_0x43c7f8(0x21c)][_0x43c7f8(0x1d5)]=function(_0x5dfedb,_0x481045,_0x3f70bc){const _0x42b476=_0x43c7f8;if(_0x481045[_0x42b476(0x20c)][0x2]<0x0)return;const _0x4cc51e=_0x481045[_0x42b476(0x20c)][0x2]+_0x5dfedb;this[_0x42b476(0x2f0)][_0x3f70bc][_0x42b476(0x20c)][0x2]=_0x4cc51e;},Game_Interpreter[_0x43c7f8(0x21c)]['adjustShowChoiceCancel']=function(_0x11a272,_0x171cdf,_0x27e625){const _0x50a375=_0x43c7f8;if(_0x171cdf[_0x50a375(0x20c)][0x1]>=0x0){if(_0x50a375(0x10e)==='omkcy')_0x56862a[_0x50a375(0x11c)]=new _0x3d33ad(_0x50a375(0x1ac)+_0x5e2335[_0x50a375(0x2ac)][_0x50a375(0x235)](/\\/g,'\x1b')+'\x27');else{var _0xa42338=_0x171cdf[_0x50a375(0x20c)][0x1]+_0x11a272;this['_list'][_0x27e625][_0x50a375(0x20c)][0x1]=_0xa42338;}}else{if(_0x171cdf['parameters'][0x1]===-0x2){if(_0x50a375(0x200)!==_0x50a375(0x1be))this[_0x50a375(0x2f0)][_0x27e625]['parameters'][0x1]=_0x171cdf[_0x50a375(0x20c)][0x1];else return this['_wordWrap']=_0x46dc8f,'';}}},Game_Interpreter[_0x43c7f8(0x21c)]['addExtraShowChoices']=function(_0x2f3a6b,_0x522dd9){const _0x2ab48c=_0x43c7f8;for(const _0x538b1e of _0x2f3a6b[_0x2ab48c(0x20c)][0x0]){this['_list'][_0x522dd9][_0x2ab48c(0x20c)][0x0][_0x2ab48c(0x2d5)](_0x538b1e);}this[_0x2ab48c(0x2f0)]['splice'](this[_0x2ab48c(0x1fe)]-0x1,0x2);};function _0x4ee1(_0x2e989a,_0x3f0c8b){const _0xf9c179=_0xf9c1();return _0x4ee1=function(_0x4ee1c2,_0x18a70b){_0x4ee1c2=_0x4ee1c2-0x71;let _0x164620=_0xf9c179[_0x4ee1c2];return _0x164620;},_0x4ee1(_0x2e989a,_0x3f0c8b);}function Game_MessageCommonEvent(){const _0x4cd4a7=_0x43c7f8;this[_0x4cd4a7(0x1bc)](...arguments);}Game_MessageCommonEvent[_0x43c7f8(0x21c)][_0x43c7f8(0x1bc)]=function(_0x1e27b5,_0x5f0a5d){const _0x18073f=_0x43c7f8;this[_0x18073f(0x26a)]=_0x1e27b5,this['_eventId']=_0x5f0a5d||0x0,this[_0x18073f(0x73)]();},Game_MessageCommonEvent[_0x43c7f8(0x21c)][_0x43c7f8(0xeb)]=function(){const _0xf4e181=_0x43c7f8;return $dataCommonEvents[this[_0xf4e181(0x26a)]];},Game_MessageCommonEvent[_0x43c7f8(0x21c)][_0x43c7f8(0x2f5)]=function(){const _0x1152f7=_0x43c7f8;return this[_0x1152f7(0xeb)]()[_0x1152f7(0x2f5)];},Game_MessageCommonEvent[_0x43c7f8(0x21c)][_0x43c7f8(0x73)]=function(){const _0x526f34=_0x43c7f8;this[_0x526f34(0xe8)]=new Game_Interpreter(),this[_0x526f34(0xe8)]['setup'](this['list'](),this['_eventId']);},Game_MessageCommonEvent[_0x43c7f8(0x21c)][_0x43c7f8(0x17e)]=function(){const _0x1a663e=_0x43c7f8;if(this['_interpreter']){if('mWzku'!==_0x1a663e(0x82)){var _0xe8b22a=_0x19ca16['parameters'][0x1]+_0x33953f;this[_0x1a663e(0x2f0)][_0x32e6c1][_0x1a663e(0x20c)][0x1]=_0xe8b22a;}else this[_0x1a663e(0xe8)][_0x1a663e(0xfe)]()?this[_0x1a663e(0xe8)][_0x1a663e(0x17e)]():this[_0x1a663e(0x209)]();}},Game_MessageCommonEvent[_0x43c7f8(0x21c)][_0x43c7f8(0x209)]=function(){const _0x5ecba5=_0x43c7f8;this[_0x5ecba5(0xe8)]=null;},Scene_Message[_0x43c7f8(0x21c)][_0x43c7f8(0xad)]=function(){const _0x4301b5=_0x43c7f8,_0x3d09ca=Math[_0x4301b5(0x17a)](Graphics[_0x4301b5(0x137)],$gameSystem[_0x4301b5(0x2f8)]()),_0x5d8fd9=$gameSystem['getMessageWindowRows'](),_0x2da744=this[_0x4301b5(0xc5)](_0x5d8fd9,![]),_0x2734fe=(Graphics['boxWidth']-_0x3d09ca)/0x2,_0x5d56d7=0x0;return new Rectangle(_0x2734fe,_0x5d56d7,_0x3d09ca,_0x2da744);},VisuMZ[_0x43c7f8(0x2fa)]['Scene_Options_maxCommands']=Scene_Options['prototype'][_0x43c7f8(0x26f)],Scene_Options[_0x43c7f8(0x21c)]['maxCommands']=function(){const _0x1a25d5=_0x43c7f8;let _0x28b9a4=VisuMZ['MessageCore'][_0x1a25d5(0x109)][_0x1a25d5(0x165)](this);const _0x1655bc=VisuMZ[_0x1a25d5(0x2fa)][_0x1a25d5(0x188)];if(_0x1655bc[_0x1a25d5(0x2db)][_0x1a25d5(0x20f)]&&_0x1655bc[_0x1a25d5(0x2db)][_0x1a25d5(0x10d)])_0x28b9a4++;return _0x28b9a4;},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x14f)]=Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x1bc)],Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x1bc)]=function(_0x1337b2){const _0x116a73=_0x43c7f8;this[_0x116a73(0x30f)](_0x1337b2),VisuMZ[_0x116a73(0x2fa)][_0x116a73(0x14f)][_0x116a73(0x165)](this,_0x1337b2);},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x30f)]=function(_0x34693c){const _0x1ebe67=_0x43c7f8;this[_0x1ebe67(0xe3)](),this[_0x1ebe67(0x240)](),this['registerResetRect'](_0x34693c);},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0xe3)]=function(){const _0x44f932=_0x43c7f8;this[_0x44f932(0x2b7)](_0x44f932(0x99));},Window_Base['prototype']['setTextAlignment']=function(_0x1d3c0d){this['_textAlignment']=_0x1d3c0d;},Window_Base[_0x43c7f8(0x21c)]['getTextAlignment']=function(){const _0x522e06=_0x43c7f8;return this[_0x522e06(0xcd)];},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x1c8)]=Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x291)],Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x291)]=function(_0x1dd7f6){const _0x3edad1=_0x43c7f8;return this[_0x3edad1(0x240)](),VisuMZ[_0x3edad1(0x2fa)][_0x3edad1(0x1c8)][_0x3edad1(0x165)](this,_0x1dd7f6);},VisuMZ['MessageCore'][_0x43c7f8(0x225)]=Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x149)],Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x149)]=function(_0xca26c7){const _0x426e63=_0x43c7f8;VisuMZ[_0x426e63(0x2fa)][_0x426e63(0x225)][_0x426e63(0x165)](this,_0xca26c7);if(_0xca26c7[_0x426e63(0x314)])this['setTextAlignment'](_0x426e63(0x99));},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x240)]=function(){const _0x3d69f4=_0x43c7f8;this[_0x3d69f4(0x28b)](![]);},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x25a)]=function(){const _0x59df2b=_0x43c7f8;return this[_0x59df2b(0x89)];},Window_Base[_0x43c7f8(0x21c)]['setWordWrap']=function(_0x4aa1a7){return this['_wordWrap']=_0x4aa1a7,'';},Window_Base['prototype']['registerResetRect']=function(_0x21a719){const _0x43c7e5=_0x43c7f8;this[_0x43c7e5(0x14a)]=JsonEx['makeDeepCopy'](_0x21a719);},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0xc4)]=function(){const _0x179b00=_0x43c7f8;this[_0x179b00(0x189)][_0x179b00(0x241)]=$gameSystem[_0x179b00(0xb1)](),this[_0x179b00(0x189)]['fontSize']=$gameSystem[_0x179b00(0xf2)](),this[_0x179b00(0x189)][_0x179b00(0x1d7)]=![],this['contents'][_0x179b00(0x316)]=![],this['resetTextColor']();},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x199)]=function(){const _0x155e08=_0x43c7f8;this[_0x155e08(0x118)](ColorManager[_0x155e08(0x2a9)]()),this['changeOutlineColor'](ColorManager[_0x155e08(0x25f)]());const _0xb7f963=VisuMZ[_0x155e08(0x2fa)]['Settings'][_0x155e08(0x1e5)];_0xb7f963[_0x155e08(0x248)]===undefined&&('zODLr'==='FdfWp'?(_0x4eca3c[_0x155e08(0x2fa)]['Window_Base_processControlCharacter'][_0x155e08(0x165)](this,_0x365a77,_0xf4e899),_0x35ac65==='\x1bWrapBreak[0]'&&this[_0x155e08(0xbf)](_0x57b1a9)):_0xb7f963[_0x155e08(0x248)]=0x3),this[_0x155e08(0x189)]['outlineWidth']=_0xb7f963['DefaultOutlineWidth'],this[_0x155e08(0x19f)](![]);},Window_Base['prototype'][_0x43c7f8(0x19f)]=function(_0x5a125f){const _0x2f6d55=_0x43c7f8;this[_0x2f6d55(0xf6)]=_0x5a125f;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x2a3)]=function(){const _0x43a1b7=_0x43c7f8;return this[_0x43a1b7(0xf6)];},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x194)]=function(){return![];},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x238)]=function(){const _0x1778ca=_0x43c7f8,_0x50c726=[_0x1778ca(0x241),_0x1778ca(0x22d),_0x1778ca(0x1d7),_0x1778ca(0x316),_0x1778ca(0x122),_0x1778ca(0x11d),'outlineWidth',_0x1778ca(0x124)];let _0x3768b7={};for(const _0x2656e8 of _0x50c726){_0x3768b7[_0x2656e8]=this['contents'][_0x2656e8];}return _0x3768b7;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x212)]=function(_0xea0dbe){const _0x1eb4ff=_0x43c7f8;for(const _0x4ca0b4 in _0xea0dbe){_0x1eb4ff(0x299)!==_0x1eb4ff(0x299)?this[_0x1eb4ff(0x2f9)](_0x30ef20,0x1):this[_0x1eb4ff(0x189)][_0x4ca0b4]=_0xea0dbe[_0x4ca0b4];}},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0xa5)]=Window_Base[_0x43c7f8(0x21c)]['update'],Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x17e)]=function(){const _0x56049f=_0x43c7f8;VisuMZ['MessageCore'][_0x56049f(0xa5)][_0x56049f(0x165)](this),this['updateMove']();},Window_Base[_0x43c7f8(0x21c)]['canMove']=function(){return![];},Window_Base['prototype'][_0x43c7f8(0x17c)]=function(){const _0x8eb835=_0x43c7f8;if(this[_0x8eb835(0x16c)]>0x0){if(this[_0x8eb835(0x2fb)]()){if(_0x8eb835(0x2c9)!==_0x8eb835(0x2c9)){if(_0x9b831['inBattle']()){}else _0x211164[_0x8eb835(0x141)](_0x1ec182);}else this['x']=this[_0x8eb835(0x27a)](this['x'],this['_moveTargetX']),this['y']=this[_0x8eb835(0x27a)](this['y'],this[_0x8eb835(0x2dd)]),this[_0x8eb835(0x137)]=this[_0x8eb835(0x27a)](this[_0x8eb835(0x137)],this[_0x8eb835(0x1f4)]),this[_0x8eb835(0xb6)]=this['applyMoveEasing'](this[_0x8eb835(0xb6)],this['_moveTargetHeight']),this[_0x8eb835(0x264)]();}this[_0x8eb835(0x16c)]--;}},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x264)]=function(_0x28b23e,_0x534946){const _0x4ba210=_0x43c7f8;!_0x28b23e&&(this[_0x4ba210(0x137)]=Math['min'](this[_0x4ba210(0x137)],Graphics['width']),this[_0x4ba210(0xb6)]=Math['min'](this[_0x4ba210(0xb6)],Graphics['height']));if(!_0x534946){if(_0x4ba210(0x1ff)===_0x4ba210(0x1ff)){const _0x33b8d7=-(Math[_0x4ba210(0x91)](Graphics[_0x4ba210(0x137)]-Graphics['boxWidth'])/0x2),_0x505715=_0x33b8d7+Graphics[_0x4ba210(0x137)]-this[_0x4ba210(0x137)],_0x1c9cb=-(Math[_0x4ba210(0x91)](Graphics['height']-Graphics['boxHeight'])/0x2),_0x8e26ca=_0x1c9cb+Graphics['height']-this['height'];this['x']=this['x']['clamp'](_0x33b8d7,_0x505715),this['y']=this['y'][_0x4ba210(0x7d)](_0x1c9cb,_0x8e26ca);}else _0x2c8e69[_0x4ba210(0x30d)](_0xef4c3a['textCodeCheck'])&&(_0x1adccd=_0x6dc901[_0x4ba210(0x235)](_0x5ba870['textCodeCheck'],_0x4544e1[_0x4ba210(0x11c)]),_0x5b0814=this[_0x4ba210(0x2d9)](_0x1c4fd7));}},Window_Base[_0x43c7f8(0x21c)]['applyMoveEasing']=function(_0x4f1386,_0xbc3373){const _0x580643=_0x43c7f8,_0x54e279=this[_0x580643(0x16c)],_0x326f5f=this['_wholeMoveDuration'],_0x4d3c6e=this[_0x580643(0xd2)]((_0x326f5f-_0x54e279)/_0x326f5f),_0x5aac62=this[_0x580643(0xd2)]((_0x326f5f-_0x54e279+0x1)/_0x326f5f),_0x5563fe=(_0x4f1386-_0xbc3373*_0x4d3c6e)/(0x1-_0x4d3c6e);return _0x5563fe+(_0xbc3373-_0x5563fe)*_0x5aac62;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0xd2)]=function(_0x7d13d8){const _0x30d45f=_0x43c7f8,_0x26c0d5=0x2;switch(this['_moveEasingType']){case 0x0:return _0x7d13d8;case 0x1:return this[_0x30d45f(0xa6)](_0x7d13d8,_0x26c0d5);case 0x2:return this['easeOut'](_0x7d13d8,_0x26c0d5);case 0x3:return this[_0x30d45f(0x279)](_0x7d13d8,_0x26c0d5);default:if(Imported[_0x30d45f(0x229)]){if(_0x30d45f(0x113)!==_0x30d45f(0x113))this[_0x30d45f(0x28b)](_0x3194cc[_0x30d45f(0x289)]());else return VisuMZ['applyMoveEasing'](_0x7d13d8,this[_0x30d45f(0x103)]);}else return _0x7d13d8;}},Window_Base['prototype'][_0x43c7f8(0x217)]=function(_0x3c5af8,_0x2189c1,_0x23a42b,_0x4b70e2,_0x571f66,_0x5ccd12){const _0x269038=_0x43c7f8;this['_moveTargetX']=_0x3c5af8,this[_0x269038(0x2dd)]=_0x2189c1,this['_moveTargetWidth']=_0x23a42b||this[_0x269038(0x137)],this[_0x269038(0x1f2)]=_0x4b70e2||this[_0x269038(0xb6)],this[_0x269038(0x16c)]=_0x571f66||0x1;if(this[_0x269038(0x16c)]<=0x0)this[_0x269038(0x16c)]=0x1;this[_0x269038(0x276)]=this['_moveDuration'],this['_moveEasingType']=_0x5ccd12||0x0;if(_0x571f66<=0x0)this[_0x269038(0x17c)]();},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x1ed)]=function(_0x847b70,_0x17b053,_0x5f1416,_0x2eb7a2,_0x35d129,_0x5a8114){const _0x2d2c5e=_0x43c7f8;this[_0x2d2c5e(0x2c1)]=this['x']+_0x847b70,this['_moveTargetY']=this['y']+_0x17b053,this['_moveTargetWidth']=this['width']+(_0x5f1416||0x0),this[_0x2d2c5e(0x1f2)]=this['height']+(_0x2eb7a2||0x0),this[_0x2d2c5e(0x16c)]=_0x35d129||0x1;if(this[_0x2d2c5e(0x16c)]<=0x0)this[_0x2d2c5e(0x16c)]=0x1;this['_wholeMoveDuration']=this[_0x2d2c5e(0x16c)],this[_0x2d2c5e(0x103)]=_0x5a8114||0x0;if(_0x35d129<=0x0)this[_0x2d2c5e(0x17c)]();},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x24b)]=function(_0x2a6682,_0x2d6664){const _0x12de77=_0x43c7f8;this['moveTo'](this[_0x12de77(0x14a)]['x'],this['_resetRect']['y'],this[_0x12de77(0x14a)][_0x12de77(0x137)],this[_0x12de77(0x14a)][_0x12de77(0xb6)],_0x2a6682,_0x2d6664);},VisuMZ['MessageCore']['Window_Base_changeTextColor']=Window_Base['prototype'][_0x43c7f8(0x118)],Window_Base['prototype']['changeTextColor']=function(_0x58f22a){const _0x19c4f8=_0x43c7f8;if(this[_0x19c4f8(0x2a3)]())return;_0x58f22a=_0x58f22a[_0x19c4f8(0x235)](/\,/g,''),this[_0x19c4f8(0x95)]=this[_0x19c4f8(0x95)]||[],this['_textColorStack']['unshift'](this[_0x19c4f8(0x189)][_0x19c4f8(0x122)]),VisuMZ['MessageCore'][_0x19c4f8(0x134)][_0x19c4f8(0x165)](this,_0x58f22a);},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x243)]=function(_0x1f58a5){const _0x9021dc=_0x43c7f8;this[_0x9021dc(0x98)](_0x1f58a5);if(this['isColorLocked']())return;_0x1f58a5[_0x9021dc(0x314)]&&(_0x9021dc(0x277)===_0x9021dc(0x277)?(this[_0x9021dc(0x95)]=this[_0x9021dc(0x95)]||[],this[_0x9021dc(0x189)]['textColor']=this[_0x9021dc(0x95)][_0x9021dc(0x286)]()||ColorManager[_0x9021dc(0x2a9)]()):this[_0x9021dc(0xed)]=_0x277444['followers']()[_0x9021dc(0x214)](_0x50ae68-0x2));},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x272)]=function(_0x96d1fa){const _0x33c3e8=_0x43c7f8;return _0x96d1fa=this[_0x33c3e8(0x307)](_0x96d1fa),_0x96d1fa=this[_0x33c3e8(0x227)](_0x96d1fa),_0x96d1fa=this[_0x33c3e8(0x2d9)](_0x96d1fa),_0x96d1fa=this['preConvertEscapeCharacters'](_0x96d1fa),_0x96d1fa=this[_0x33c3e8(0x93)](_0x96d1fa),_0x96d1fa=this[_0x33c3e8(0xe5)](_0x96d1fa),_0x96d1fa=this[_0x33c3e8(0x27c)](_0x96d1fa),_0x96d1fa=this[_0x33c3e8(0x258)](_0x96d1fa),_0x96d1fa=this['convertBaseEscapeCharacters'](_0x96d1fa),_0x96d1fa=this['convertHardcodedEscapeReplacements'](_0x96d1fa),_0x96d1fa=this[_0x33c3e8(0x2d2)](_0x96d1fa),_0x96d1fa=this[_0x33c3e8(0xcf)](_0x96d1fa),_0x96d1fa=this[_0x33c3e8(0x2b9)](_0x96d1fa),_0x96d1fa=this[_0x33c3e8(0x2d9)](_0x96d1fa),_0x96d1fa=this[_0x33c3e8(0x1ef)](_0x96d1fa),_0x96d1fa=this[_0x33c3e8(0xb2)](_0x96d1fa),_0x96d1fa;},Window_Base['prototype'][_0x43c7f8(0x307)]=function(_0x257fdc){const _0x18f0c8=_0x43c7f8;for(const _0x5afe7b of VisuMZ[_0x18f0c8(0x2fa)][_0x18f0c8(0x188)][_0x18f0c8(0x18f)]){if(_0x18f0c8(0x2cb)!==_0x18f0c8(0x2cb)){const _0x43bee6=_0x1fde58[_0x18f0c8(0x22f)]('['+_0x2178e9['$1'][_0x18f0c8(0x30d)](/\d+/g)+']');for(const _0x18a695 of _0x43bee6){if(!_0x464383[_0x18f0c8(0x24a)](_0x18a695))return!![];}return![];}else _0x257fdc['match'](_0x5afe7b['textCodeCheck'])&&(_0x257fdc=_0x257fdc[_0x18f0c8(0x235)](_0x5afe7b[_0x18f0c8(0x2d4)],_0x5afe7b['textCodeResult']['bind'](this)));}return _0x257fdc;},Window_Base['prototype'][_0x43c7f8(0x227)]=function(_0x25a73c){const _0x118037=_0x43c7f8;return _0x25a73c=_0x25a73c['replace'](/\\/g,'\x1b'),_0x25a73c=_0x25a73c[_0x118037(0x235)](/\x1b\x1b/g,'\x5c'),_0x25a73c;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x2d9)]=function(_0x427c54){const _0x1acd99=_0x43c7f8;for(;;){if(_0x1acd99(0x1c5)==='vuLFa')this[_0x1acd99(0x189)]['fontSize']=_0x4bbefb(_0x490e00[0x3])[_0x1acd99(0x7d)](_0x31326c[_0x1acd99(0x2fa)]['Settings'][_0x1acd99(0x1e5)][_0x1acd99(0x207)],_0x1546e1[_0x1acd99(0x2fa)][_0x1acd99(0x188)]['General'][_0x1acd99(0x2a6)]);else{if(_0x427c54[_0x1acd99(0x30d)](/\\V\[(\d+)\]/gi))_0x427c54=_0x427c54[_0x1acd99(0x235)](/\\V\[(\d+)\]/gi,(_0x42e00b,_0xdf2945)=>this[_0x1acd99(0x227)](String($gameVariables['value'](parseInt(_0xdf2945)))));else{if(_0x427c54[_0x1acd99(0x30d)](/\x1bV\[(\d+)\]/gi))_0x427c54=_0x427c54[_0x1acd99(0x235)](/\x1bV\[(\d+)\]/gi,(_0x4fa7ea,_0x41c8da)=>this[_0x1acd99(0x227)](String($gameVariables[_0x1acd99(0x24a)](parseInt(_0x41c8da)))));else break;}}}return _0x427c54;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x215)]=function(_0x3b3345){const _0x517066=_0x43c7f8;return this[_0x517066(0x2a1)](),_0x3b3345;},Window_Base[_0x43c7f8(0x21c)]['postConvertEscapeCharacters']=function(_0x52c449){return _0x52c449;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x93)]=function(_0x19c582){const _0x18c34d=_0x43c7f8;return _0x19c582=_0x19c582[_0x18c34d(0x235)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x19c582=_0x19c582[_0x18c34d(0x235)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x19c582=_0x19c582['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x19c582;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0xe5)]=function(_0x258b35){const _0x3faab4=_0x43c7f8;return _0x258b35=_0x258b35[_0x3faab4(0x235)](/<B>/gi,_0x3faab4(0x298)),_0x258b35=_0x258b35[_0x3faab4(0x235)](/<\/B>/gi,_0x3faab4(0x16a)),_0x258b35=_0x258b35[_0x3faab4(0x235)](/<I>/gi,'\x1bITALIC[1]'),_0x258b35=_0x258b35[_0x3faab4(0x235)](/<\/I>/gi,_0x3faab4(0x1e6)),_0x258b35;},Window_Base[_0x43c7f8(0x21c)]['convertTextAlignmentEscapeCharacters']=function(_0x567778){const _0xa9dad5=_0x43c7f8;return _0x567778=_0x567778[_0xa9dad5(0x235)](/<LEFT>/gi,_0xa9dad5(0x108)),_0x567778=_0x567778[_0xa9dad5(0x235)](/<\/LEFT>/gi,_0xa9dad5(0x1df)),_0x567778=_0x567778[_0xa9dad5(0x235)](/<CENTER>/gi,_0xa9dad5(0x1ca)),_0x567778=_0x567778[_0xa9dad5(0x235)](/<\/CENTER>/gi,'\x1bTEXTALIGNMENT[0]'),_0x567778=_0x567778['replace'](/<RIGHT>/gi,_0xa9dad5(0x1c4)),_0x567778=_0x567778[_0xa9dad5(0x235)](/<\/RIGHT>/gi,_0xa9dad5(0x1df)),_0x567778;},Window_Base[_0x43c7f8(0x21c)]['convertLockColorsEscapeCharacters']=function(_0x533195){const _0x6cbe31=_0x43c7f8;return _0x533195=_0x533195[_0x6cbe31(0x235)](/<COLORLOCK>/gi,_0x6cbe31(0x27b)),_0x533195=_0x533195[_0x6cbe31(0x235)](/<\/COLORLOCK>/gi,_0x6cbe31(0x2ba)),_0x533195=_0x533195[_0x6cbe31(0x235)](/\(\(\(/gi,_0x6cbe31(0x27b)),_0x533195=_0x533195[_0x6cbe31(0x235)](/\)\)\)/gi,_0x6cbe31(0x2ba)),_0x533195;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x2e2)]=function(_0x1bb3bc){const _0x4175ac=_0x43c7f8;return _0x1bb3bc=_0x1bb3bc[_0x4175ac(0x235)](/\x1bN\[(\d+)\]/gi,(_0x18893b,_0x5c8d5e)=>this[_0x4175ac(0x153)](parseInt(_0x5c8d5e))),_0x1bb3bc=_0x1bb3bc[_0x4175ac(0x235)](/\x1bP\[(\d+)\]/gi,(_0x503e68,_0x53c0a3)=>this[_0x4175ac(0x256)](parseInt(_0x53c0a3))),_0x1bb3bc=_0x1bb3bc[_0x4175ac(0x235)](/\x1bG/gi,TextManager[_0x4175ac(0x234)]),_0x1bb3bc;},Window_Base['prototype'][_0x43c7f8(0x274)]=function(_0x9cc99){const _0x3b2794=_0x43c7f8;return _0x9cc99=_0x9cc99[_0x3b2794(0x235)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x3b2794(0x2cf)]()),_0x9cc99=_0x9cc99[_0x3b2794(0x235)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x3b2794(0xf5)]()),_0x9cc99=_0x9cc99[_0x3b2794(0x235)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x3b2794(0x9e)](!![])),_0x9cc99=_0x9cc99[_0x3b2794(0x235)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x3b2794(0x9e)](![])),_0x9cc99;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x2cf)]=function(){const _0x504f4b=_0x43c7f8;if(!SceneManager[_0x504f4b(0x23a)]())return'';if(BattleManager[_0x504f4b(0x2fd)])return BattleManager[_0x504f4b(0x2fd)][_0x504f4b(0x140)]();if(BattleManager[_0x504f4b(0xac)][0x0])return BattleManager[_0x504f4b(0xac)][0x0]['name']();return'';},Window_Base['prototype']['battleUserName']=function(){const _0x10785d=_0x43c7f8;if(!SceneManager[_0x10785d(0x23a)]())return'';let _0x48fc10=null;_0x48fc10=BattleManager[_0x10785d(0xd6)];if(!_0x48fc10&&BattleManager[_0x10785d(0xc6)]()){if(_0x10785d(0x2e9)===_0x10785d(0x8f)){const _0x2e24c8=_0x3c286f[_0x10785d(0x22f)]('['+_0x8c9bbd['$1'][_0x10785d(0x30d)](/\d+/g)+']');for(const _0x368971 of _0x2e24c8){if(_0x35b9e8[_0x10785d(0x24a)](_0x368971))return![];}return!![];}else _0x48fc10=BattleManager[_0x10785d(0x13d)]();}return _0x48fc10?_0x48fc10[_0x10785d(0x140)]():'';},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x9e)]=function(_0x155ea4){const _0xe46eba=_0x43c7f8;if(!SceneManager[_0xe46eba(0x23a)]())return'';let _0x45458d=BattleManager[_0xe46eba(0x7f)]||null;if(!_0x45458d&&BattleManager[_0xe46eba(0xc6)]()){if(_0xe46eba(0x224)===_0xe46eba(0x231)){const _0x2556d6=_0x5c0148[_0xe46eba(0x2fa)]['Settings']['AutoColor'];let _0x13d322=0x0;if(_0x2a8c93===_0x5f4345)_0x13d322=_0x2556d6[_0xe46eba(0x174)];if(_0x3aedfb===_0x304c9b)_0x13d322=_0x2556d6[_0xe46eba(0x195)];if(_0x3a211c===_0x109cd7)_0x13d322=_0x2556d6['Skills'];if(_0x3bf103===_0x915b5)_0x13d322=_0x2556d6[_0xe46eba(0x114)];if(_0x18f84a===_0x4216e6)_0x13d322=_0x2556d6[_0xe46eba(0x94)];if(_0x587f42===_0xc7eb93)_0x13d322=_0x2556d6[_0xe46eba(0x21b)];if(_0x5c91f6===_0x514dec)_0x13d322=_0x2556d6[_0xe46eba(0x2a0)];if(_0x2eb45f===_0x109592)_0x13d322=_0x2556d6['States'];return _0x13d322>0x0&&(_0xfcf8c8=_0xe46eba(0x147)['format'](_0x13d322,_0x1eba9f)),_0x4fd10b;}else _0x45458d=BattleManager[_0xe46eba(0x125)]();}if(_0x45458d){if('qxApC'===_0xe46eba(0x223)){const _0xd0bb87=_0x16f886['parse']('['+_0x53d680['$1'][_0xe46eba(0x30d)](/\d+/g)+']');for(const _0x213da8 of _0xd0bb87){if(!_0x54a649[_0xe46eba(0x24a)](_0x213da8))return!![];}return![];}else{let _0x315f29='';if(_0x155ea4)_0x315f29+=_0xe46eba(0x1d2)['format'](_0x45458d['iconIndex']);return _0x315f29+=_0x45458d[_0xe46eba(0x140)],_0x315f29;}}return'';},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x2d2)]=function(_0x439ae0){const _0x3fa216=_0x43c7f8;for(const _0x576080 of VisuMZ[_0x3fa216(0x2fa)]['Settings'][_0x3fa216(0x236)]){if(_0x3fa216(0x213)!=='ZKGhM'){if(!_0x129536[_0x3fa216(0x24a)](_0x1e8a68))return!![];}else _0x439ae0[_0x3fa216(0x30d)](_0x576080[_0x3fa216(0x2d4)])&&(_0x439ae0=_0x439ae0[_0x3fa216(0x235)](_0x576080[_0x3fa216(0x2d4)],_0x576080[_0x3fa216(0x11c)]),_0x439ae0=this[_0x3fa216(0x2d9)](_0x439ae0));}return _0x439ae0;},Window_Base[_0x43c7f8(0x21c)]['convertMessageCoreEscapeReplacements']=function(_0x573709){const _0x310ccd=_0x43c7f8;for(const _0x4c004d of VisuMZ['MessageCore']['Settings'][_0x310ccd(0x19c)]){if(_0x310ccd(0x2b8)===_0x310ccd(0x2b8))_0x573709['match'](_0x4c004d[_0x310ccd(0x2d4)])&&(_0x573709=_0x573709[_0x310ccd(0x235)](_0x4c004d[_0x310ccd(0x2d4)],_0x4c004d[_0x310ccd(0x11c)][_0x310ccd(0x12a)](this)),_0x573709=this[_0x310ccd(0x2d9)](_0x573709));else return _0x2497ff;}return _0x573709;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x153)]=function(_0x2f2513){const _0xaad754=_0x43c7f8,_0x1d2ac8=_0x2f2513>=0x1?$gameActors[_0xaad754(0x13d)](_0x2f2513):null,_0x129f06=_0x1d2ac8?_0x1d2ac8[_0xaad754(0x140)]():'',_0x335070=Number(VisuMZ['MessageCore']['Settings'][_0xaad754(0x263)][_0xaad754(0x174)]);if(this[_0xaad754(0x194)]()&&_0x335070!==0x0)return _0xaad754(0x147)[_0xaad754(0xdf)](_0x335070,_0x129f06);else{if(_0xaad754(0x280)!==_0xaad754(0x280)){let _0x571b56=0x60;for(const _0x2f43c0 of this[_0xaad754(0x2f0)]){const _0x1b8ea1=_0x2f43c0['name'],_0xeb6f42=this[_0xaad754(0x291)](_0x1b8ea1)[_0xaad754(0x137)],_0x3ce6f8=_0x1f7047[_0xaad754(0x193)](_0xeb6f42)+this[_0xaad754(0x2e8)]()*0x2;_0x571b56<_0x3ce6f8&&(_0x571b56=_0x3ce6f8);}return _0x571b56;}else return _0x129f06;}},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x256)]=function(_0x23d6fb){const _0x4b407a=_0x43c7f8,_0x3d2f9f=_0x23d6fb>=0x1?$gameParty[_0x4b407a(0x71)]()[_0x23d6fb-0x1]:null,_0xe14c2d=_0x3d2f9f?_0x3d2f9f['name']():'',_0x47bfd5=Number(VisuMZ[_0x4b407a(0x2fa)][_0x4b407a(0x188)][_0x4b407a(0x263)][_0x4b407a(0x174)]);if(this[_0x4b407a(0x194)]()&&_0x47bfd5!==0x0)return'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x4b407a(0xdf)](_0x47bfd5,_0xe14c2d);else{if(_0x4b407a(0xbd)===_0x4b407a(0x221))_0x1c947f=this['processStoredAutoColorChanges'](_0xd5fdf6),_0x351651=this[_0x4b407a(0xee)](_0x1a0346);else return _0xe14c2d;}},Window_Base['prototype'][_0x43c7f8(0x1ef)]=function(_0x26dd61){const _0x2afb22=_0x43c7f8;return this[_0x2afb22(0x194)]()&&(_0x26dd61=this[_0x2afb22(0x1ad)](_0x26dd61),_0x26dd61=this[_0x2afb22(0xee)](_0x26dd61)),_0x26dd61;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x1ad)]=function(_0x59b8c6){for(autoColor of VisuMZ['MessageCore']['AutoColorRegExp']){_0x59b8c6=_0x59b8c6['replace'](autoColor[0x0],autoColor[0x1]);}return _0x59b8c6;},Window_Base[_0x43c7f8(0x21c)]['clearActorNameAutoColor']=function(){const _0x105cc6=_0x43c7f8;this[_0x105cc6(0x2bf)]=[];},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x2a1)]=function(){const _0x5c0369=_0x43c7f8;this[_0x5c0369(0x1c7)]();const _0x2f05b0=VisuMZ['MessageCore'][_0x5c0369(0x188)][_0x5c0369(0x263)],_0x33458a=_0x2f05b0[_0x5c0369(0x174)];if(_0x33458a<=0x0)return;for(const _0x2fddf2 of $gameActors[_0x5c0369(0x13f)]){if(_0x5c0369(0x2ee)!==_0x5c0369(0x2ee))return!![];else{if(!_0x2fddf2)continue;const _0x4a3a9f=_0x2fddf2['name']();if(_0x4a3a9f[_0x5c0369(0x2b2)]()['length']<=0x0)continue;if(/^\d+$/[_0x5c0369(0x1e7)](_0x4a3a9f))continue;if(_0x4a3a9f[_0x5c0369(0x30d)](/-----/i))continue;let _0x3fb3e8=VisuMZ[_0x5c0369(0x2fa)][_0x5c0369(0x157)](_0x4a3a9f);const _0x592003=new RegExp('\x5cb'+_0x3fb3e8+'\x5cb','g'),_0xde9a77='\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x33458a,_0x4a3a9f);this[_0x5c0369(0x2bf)]['push']([_0x592003,_0xde9a77]);}}},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0xee)]=function(_0x5a3f13){const _0x292012=_0x43c7f8;this[_0x292012(0x2bf)]===undefined&&this[_0x292012(0x2a1)]();for(autoColor of this['_autoColorActorNames']){_0x5a3f13=_0x5a3f13[_0x292012(0x235)](autoColor[0x0],autoColor[0x1]);}return _0x5a3f13;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x187)]=function(_0x174488,_0x181e07,_0x298470){const _0xb523dd=_0x43c7f8;if(!_0x174488)return'';const _0x4a397f=_0x174488[_0x181e07];let _0x1aa289='';if(_0x4a397f&&_0x298470&&_0x4a397f['iconIndex']){const _0x6371d0='\x1bi[%1]%2';_0x1aa289=_0x6371d0['format'](_0x4a397f[_0xb523dd(0x2da)],_0x4a397f['name']);}else _0x4a397f?_0x1aa289=_0x4a397f['name']:_0x1aa289='';return this['isAutoColorAffected']()&&(_0x1aa289=this['applyDatabaseAutoColor'](_0x1aa289,_0x174488)),_0x1aa289;},Window_Base[_0x43c7f8(0x21c)]['lastGainedObjectName']=function(_0x8090b){const _0x22749f=_0x43c7f8,_0x5c5929=$gameParty[_0x22749f(0x1d4)]();if(_0x5c5929['id']<0x0)return'';let _0x3befd9=null;if(_0x5c5929[_0x22749f(0x10b)]===0x0)_0x3befd9=$dataItems[_0x5c5929['id']];if(_0x5c5929[_0x22749f(0x10b)]===0x1)_0x3befd9=$dataWeapons[_0x5c5929['id']];if(_0x5c5929[_0x22749f(0x10b)]===0x2)_0x3befd9=$dataArmors[_0x5c5929['id']];if(!_0x3befd9)return'';return _0x8090b?_0x22749f(0xf1)[_0x22749f(0xdf)](_0x3befd9[_0x22749f(0x2da)],_0x3befd9[_0x22749f(0x140)]):_0x3befd9['name'];},Window_Base[_0x43c7f8(0x21c)]['lastGainedObjectQuantity']=function(){const _0x8e0212=_0x43c7f8,_0x2ce082=$gameParty[_0x8e0212(0x1d4)]();if(_0x2ce082['id']<=0x0)return'';return _0x2ce082[_0x8e0212(0x244)];},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x168)]=function(_0xb15d7e,_0x75a494){const _0x1f2f0d=_0x43c7f8,_0xb3b14d=VisuMZ['MessageCore'][_0x1f2f0d(0x188)]['AutoColor'];let _0x401d60=0x0;if(_0x75a494===$dataActors)_0x401d60=_0xb3b14d[_0x1f2f0d(0x174)];if(_0x75a494===$dataClasses)_0x401d60=_0xb3b14d[_0x1f2f0d(0x195)];if(_0x75a494===$dataSkills)_0x401d60=_0xb3b14d[_0x1f2f0d(0x29d)];if(_0x75a494===$dataItems)_0x401d60=_0xb3b14d[_0x1f2f0d(0x114)];if(_0x75a494===$dataWeapons)_0x401d60=_0xb3b14d['Weapons'];if(_0x75a494===$dataArmors)_0x401d60=_0xb3b14d[_0x1f2f0d(0x21b)];if(_0x75a494===$dataEnemies)_0x401d60=_0xb3b14d[_0x1f2f0d(0x2a0)];if(_0x75a494===$dataStates)_0x401d60=_0xb3b14d[_0x1f2f0d(0x92)];if(_0x401d60>0x0){if('UORTf'===_0x1f2f0d(0x2fe)){let _0x5bc6d7=this['y'];_0x2f3c5e['MessageCore'][_0x1f2f0d(0x310)]['call'](this);if(this['_autoPositionTarget'])this['y']=_0x5bc6d7;this['updateForcedPlacement'](),this[_0x1f2f0d(0x264)]();}else _0xb15d7e='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x1f2f0d(0xdf)](_0x401d60,_0xb15d7e);}return _0xb15d7e;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0xb2)]=function(_0x3a58a6){const _0x16c743=_0x43c7f8;_0x3a58a6=_0x3a58a6[_0x16c743(0x235)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x1dd021,_0x210bdf)=>this[_0x16c743(0x28b)](!![])),_0x3a58a6=_0x3a58a6['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x40b459,_0x25ec5f)=>this[_0x16c743(0x28b)](![])),_0x3a58a6=_0x3a58a6[_0x16c743(0x235)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x319c64,_0x319461)=>this[_0x16c743(0x28b)](![]));if(_0x3a58a6[_0x16c743(0x30d)](Window_Message[_0x16c743(0x271)]))this[_0x16c743(0x28b)](![]);else _0x3a58a6[_0x16c743(0x30d)](Window_Message[_0x16c743(0x1db)])&&this[_0x16c743(0x28b)](![]);if(!this['isWordWrapEnabled']())return _0x3a58a6;if(_0x3a58a6[_0x16c743(0x29c)]<=0x0)return _0x3a58a6;return VisuMZ['MessageCore'][_0x16c743(0x188)][_0x16c743(0x23b)][_0x16c743(0x11f)]?(_0x3a58a6=_0x3a58a6[_0x16c743(0x235)](/[\n\r]+/g,'\x20'),_0x3a58a6=_0x3a58a6[_0x16c743(0x235)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x3a58a6=_0x3a58a6[_0x16c743(0x235)](/[\n\r]+/g,''),_0x3a58a6=_0x3a58a6[_0x16c743(0x235)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x3a58a6=this['addWrapBreakAfterPunctuation'](_0x3a58a6),_0x3a58a6=_0x3a58a6[_0x16c743(0xfd)]('\x20')[_0x16c743(0x1bd)](_0x16c743(0x185)),_0x3a58a6=_0x3a58a6[_0x16c743(0x235)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x3a58a6=_0x3a58a6[_0x16c743(0x235)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x3a58a6;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0xf8)]=function(_0x19cb9d){return _0x19cb9d;},VisuMZ['MessageCore'][_0x43c7f8(0x315)]=Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x96)],Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x96)]=function(_0x297d17){const _0x19c3a3=_0x43c7f8;VisuMZ[_0x19c3a3(0x2fa)][_0x19c3a3(0x315)][_0x19c3a3(0x165)](this,_0x297d17),this['processTextAlignmentX'](_0x297d17);},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x1b5)]=Window_Base['prototype']['processControlCharacter'],Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x26e)]=function(_0x414f35,_0x2fdfe7){const _0x590cd8=_0x43c7f8;VisuMZ[_0x590cd8(0x2fa)]['Window_Base_processControlCharacter'][_0x590cd8(0x165)](this,_0x414f35,_0x2fdfe7),_0x2fdfe7===_0x590cd8(0x185)&&this[_0x590cd8(0xbf)](_0x414f35);},Window_Base['prototype'][_0x43c7f8(0x294)]=function(_0x4183a3){const _0x22709c=_0x43c7f8;var _0x319272=/^\<(.*?)\>/[_0x22709c(0x309)](_0x4183a3['text'][_0x22709c(0x216)](_0x4183a3['index']));return _0x319272?(_0x4183a3[_0x22709c(0x75)]+=_0x319272[0x0]['length'],String(_0x319272[0x0][_0x22709c(0x216)](0x1,_0x319272[0x0]['length']-0x1))):'';},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x154)]=Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x23c)],Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x23c)]=function(_0x2b830b,_0x5a7e0e){const _0x55466a=_0x43c7f8;switch(_0x2b830b){case'C':if(_0x5a7e0e[_0x55466a(0x314)]){if('REXTq'!==_0x55466a(0x30a))VisuMZ[_0x55466a(0x2fa)][_0x55466a(0x154)]['call'](this,_0x2b830b,_0x5a7e0e);else return _0x5b1993[_0x55466a(0x2fa)][_0x55466a(0x13a)]['call'](this)||_0xbef41e[_0x55466a(0x273)](_0x4526c7[_0x55466a(0x2fa)][_0x55466a(0x188)][_0x55466a(0x1e5)]['FastForwardKey']);}else{if('lYMPQ'===_0x55466a(0x2aa))this['obtainEscapeParam'](_0x5a7e0e);else{const _0x4ea242='\x1bi[%1]%2';_0x7b053e=_0x4ea242[_0x55466a(0xdf)](_0x3f40a1[_0x55466a(0x2da)],_0x4134f3['name']);}}break;case'I':case'{':case'}':VisuMZ[_0x55466a(0x2fa)][_0x55466a(0x154)]['call'](this,_0x2b830b,_0x5a7e0e);break;case'FS':this['processFsTextCode'](_0x5a7e0e);break;case'PX':this[_0x55466a(0x15e)](_0x5a7e0e);break;case'PY':this['processPyTextCode'](_0x5a7e0e);break;case _0x55466a(0x1fb):this['processFontChangeBold'](this[_0x55466a(0x98)](_0x5a7e0e));break;case'CENTERPICTURE':this['processDrawCenteredPicture'](_0x5a7e0e);break;case _0x55466a(0x254):this['processColorLock'](_0x5a7e0e);break;case _0x55466a(0xb3):this[_0x55466a(0x121)](_0x5a7e0e);break;case'ITALIC':this[_0x55466a(0x11b)](this[_0x55466a(0x98)](_0x5a7e0e));break;case _0x55466a(0x24e):this[_0x55466a(0x78)](_0x5a7e0e);break;case'PREVCOLOR':this['processPreviousColor'](_0x5a7e0e);break;case _0x55466a(0x1c2):this['processTextAlignmentChange'](_0x5a7e0e);break;case _0x55466a(0x77):this[_0x55466a(0x2af)](_0x5a7e0e);break;case _0x55466a(0x23d):this[_0x55466a(0xbf)](_0x5a7e0e);break;default:this[_0x55466a(0x211)](_0x2b830b,_0x5a7e0e);}},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x211)]=function(_0x2d5b64,_0x29c59e){const _0x1d7e14=_0x43c7f8;for(const _0x3c9ad7 of VisuMZ['MessageCore']['Settings'][_0x1d7e14(0x236)]){if(_0x3c9ad7[_0x1d7e14(0x1d1)]===_0x2d5b64){if('Fdgwi'!==_0x1d7e14(0x101)){if(_0x3c9ad7['Type']==='')this[_0x1d7e14(0x98)](_0x29c59e);_0x3c9ad7[_0x1d7e14(0x13c)][_0x1d7e14(0x165)](this,_0x29c59e);if(this['constructor']===Window_Message){if('YTzuE'===_0x1d7e14(0x1c6)){if(this['_lastGainedItemData']===_0x2e60c6)this['initMessageCore']();return this[_0x1d7e14(0x164)];}else{const _0x4a0138=_0x3c9ad7[_0x1d7e14(0x2bc)]||0x0;if(_0x4a0138>0x0)this['launchMessageCommonEvent'](_0x4a0138);}}}else this[_0x1d7e14(0x1e3)]();}}},Window_Base[_0x43c7f8(0x21c)]['makeFontBigger']=function(){const _0x2a42e9=_0x43c7f8;this[_0x2a42e9(0x189)]['fontSize']+=VisuMZ['MessageCore'][_0x2a42e9(0x188)][_0x2a42e9(0x1e5)][_0x2a42e9(0x2ce)],this[_0x2a42e9(0x189)][_0x2a42e9(0x22d)]=Math[_0x2a42e9(0x17a)](this['contents'][_0x2a42e9(0x22d)],VisuMZ[_0x2a42e9(0x2fa)][_0x2a42e9(0x188)][_0x2a42e9(0x1e5)]['FontBiggerCap']);},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x2c0)]=function(){const _0x2ceac9=_0x43c7f8;this[_0x2ceac9(0x189)][_0x2ceac9(0x22d)]-=VisuMZ['MessageCore'][_0x2ceac9(0x188)][_0x2ceac9(0x1e5)][_0x2ceac9(0x2ce)],this[_0x2ceac9(0x189)][_0x2ceac9(0x22d)]=Math['max'](this[_0x2ceac9(0x189)][_0x2ceac9(0x22d)],VisuMZ[_0x2ceac9(0x2fa)][_0x2ceac9(0x188)]['General'][_0x2ceac9(0x207)]);},Window_Base['prototype'][_0x43c7f8(0x210)]=function(_0x34c1f5){const _0x20c70b=_0x43c7f8,_0x37acc0=this['obtainEscapeParam'](_0x34c1f5);this['contents'][_0x20c70b(0x22d)]=_0x37acc0[_0x20c70b(0x7d)](VisuMZ[_0x20c70b(0x2fa)][_0x20c70b(0x188)]['General']['FontSmallerCap'],VisuMZ['MessageCore'][_0x20c70b(0x188)][_0x20c70b(0x1e5)][_0x20c70b(0x2a6)]);},Window_Base[_0x43c7f8(0x21c)]['maxFontSizeInLine']=function(_0x4389b9){const _0x53502a=_0x43c7f8;let _0x4316b6=this[_0x53502a(0x189)][_0x53502a(0x22d)];const _0x3ef5d6=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x1ed47a=_0x3ef5d6[_0x53502a(0x309)](_0x4389b9);if(!_0x1ed47a){if(_0x53502a(0x292)==='mCYxz'){const _0x20ad73=this[_0x53502a(0x98)](_0x1d95c6);this[_0x53502a(0x1af)]===_0x285773&&_0x37b886['drawing']&&this[_0x53502a(0x12e)](_0x20ad73);}else break;}const _0x5e6488=String(_0x1ed47a[0x1])[_0x53502a(0x26c)]();if(_0x5e6488==='{')this[_0x53502a(0x1e3)]();else{if(_0x5e6488==='}')this[_0x53502a(0x2c0)]();else _0x5e6488==='FS'&&('aJoYC'==='FcrbP'?_0x1f78f5[_0x53502a(0x11c)]=new _0x213dcc('return\x20\x27'+_0x181c87[_0x53502a(0x2ac)][_0x53502a(0x235)](/\\/g,'\x1b')+'\x27'):this[_0x53502a(0x189)][_0x53502a(0x22d)]=parseInt(_0x1ed47a[0x3])[_0x53502a(0x7d)](VisuMZ[_0x53502a(0x2fa)][_0x53502a(0x188)]['General'][_0x53502a(0x207)],VisuMZ[_0x53502a(0x2fa)]['Settings'][_0x53502a(0x1e5)][_0x53502a(0x2a6)]));}if(this['contents'][_0x53502a(0x22d)]>_0x4316b6){if(_0x53502a(0x1bb)!=='BlkoT')_0x4316b6=this[_0x53502a(0x189)][_0x53502a(0x22d)];else return(_0x49fb94[_0x53502a(0x2a2)]-this[_0x53502a(0x9f)]())/0x2;}}return _0x4316b6;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x15e)]=function(_0x509028){const _0x15388d=_0x43c7f8;_0x509028['x']=this['obtainEscapeParam'](_0x509028),VisuMZ['MessageCore'][_0x15388d(0x188)][_0x15388d(0x1e5)]['RelativePXPY']&&(_0x15388d(0x159)===_0x15388d(0x12b)?(_0x1a956f[_0x15388d(0x21c)][_0x15388d(0x199)]['call'](this),this[_0x15388d(0x118)](this[_0x15388d(0x2ae)]())):_0x509028['x']+=_0x509028[_0x15388d(0x87)]);},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x1a1)]=function(_0x372051){const _0x2cba86=_0x43c7f8;_0x372051['y']=this['obtainEscapeParam'](_0x372051),VisuMZ[_0x2cba86(0x2fa)][_0x2cba86(0x188)][_0x2cba86(0x1e5)][_0x2cba86(0x275)]&&(_0x2cba86(0x24d)===_0x2cba86(0x24d)?_0x372051['y']+=_0x372051['startY']:this[_0x2cba86(0x2f9)](_0x209913,_0x5bcb01[_0x2cba86(0x7d)](0x1,0xb)));},Window_Base['prototype']['processFontChangeBold']=function(_0x49dc35){const _0x43e376=_0x43c7f8;this[_0x43e376(0x189)][_0x43e376(0x1d7)]=!!_0x49dc35;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x11b)]=function(_0x28d560){const _0x298028=_0x43c7f8;this['contents'][_0x298028(0x316)]=!!_0x28d560;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0xf0)]=function(_0x5f6dc){const _0x185f23=_0x43c7f8,_0x2bf4ef=this[_0x185f23(0x98)](_0x5f6dc);if(!_0x5f6dc[_0x185f23(0x314)])return;switch(_0x2bf4ef){case 0x0:this[_0x185f23(0x2b7)]('default');return;case 0x1:this[_0x185f23(0x2b7)](_0x185f23(0x83));break;case 0x2:this[_0x185f23(0x2b7)]('center');break;case 0x3:this[_0x185f23(0x2b7)]('right');break;}this[_0x185f23(0x230)](_0x5f6dc);},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x230)]=function(_0xcaf472){const _0x289221=_0x43c7f8;if(!_0xcaf472['drawing'])return;if(_0xcaf472[_0x289221(0x15b)])return;if(this['getTextAlignment']()===_0x289221(0x99))return;let _0x8f32e3=_0xcaf472[_0x289221(0x186)][_0x289221(0x10a)](_0x289221(0xe2),_0xcaf472['index']+0x1),_0xb43615=_0xcaf472[_0x289221(0x186)][_0x289221(0x10a)]('\x0a',_0xcaf472[_0x289221(0x75)]+0x1);if(_0x8f32e3<0x0)_0x8f32e3=_0xcaf472[_0x289221(0x186)][_0x289221(0x29c)]+0x1;if(_0xb43615>0x0)_0x8f32e3=Math[_0x289221(0x17a)](_0x8f32e3,_0xb43615);const _0x361c83=_0xcaf472[_0x289221(0x186)][_0x289221(0x270)](_0xcaf472[_0x289221(0x75)],_0x8f32e3),_0x54e4ed=this['textSizeExTextAlignment'](_0x361c83)['width'],_0x2555f2=_0xcaf472[_0x289221(0x137)]||this[_0x289221(0x288)]-0x8,_0x3fe80d=this[_0x289221(0x1af)]===Window_Message&&$gameMessage[_0x289221(0x138)]()!=='';switch(this[_0x289221(0x1ea)]()){case'left':_0xcaf472['x']=_0xcaf472[_0x289221(0x87)];break;case'center':_0xcaf472['x']=_0xcaf472[_0x289221(0x87)],_0xcaf472['x']+=Math[_0x289221(0x91)]((_0x2555f2-_0x54e4ed)/0x2);_0x3fe80d&&('IaSvo'===_0x289221(0xd0)?(_0x402e27=_0x52768a[_0x289221(0x235)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x438808,_0x34edbf)=>{const _0x38a63b=_0x289221;return this['processAutoSize'](_0x3694a1,!![],!![]),this[_0x38a63b(0x171)](_0x38a63b(0x312),_0x4ac1df(_0x34edbf)||0x1),'';}),_0x50842d=_0x34153b[_0x289221(0x235)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x4cd4d9,_0x5620f7)=>{const _0x4c7059=_0x289221;return this[_0x4c7059(0x29e)](_0x4f79d9,!![],!![]),this[_0x4c7059(0x171)]('battle\x20party',_0x1e575c(_0x5620f7)||0x0),'';}),_0x5c5408=_0x277238[_0x289221(0x235)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x17d906,_0x29d15b)=>{const _0x561a86=_0x289221;return this['processAutoSize'](_0xf4734a,!![],!![]),this[_0x561a86(0x171)](_0x561a86(0x16b),_0x224c04(_0x29d15b)||0x0),'';})):_0xcaf472['x']-=_0xcaf472[_0x289221(0x87)]/0x2);break;case _0x289221(0x2bb):_0xcaf472['x']=_0x2555f2-_0x54e4ed+_0xcaf472[_0x289221(0x87)];if(_0x3fe80d){if(_0x289221(0x1b8)!==_0x289221(0x106))_0xcaf472['x']-=_0xcaf472[_0x289221(0x87)];else{if(!_0x4f41ec['isSceneBattle']())return'';if(_0xeb740f[_0x289221(0x2fd)])return _0x3f0092[_0x289221(0x2fd)]['name']();if(_0x467017[_0x289221(0xac)][0x0])return _0x5923e8[_0x289221(0xac)][0x0][_0x289221(0x140)]();return'';}}break;}},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x1b2)]=function(_0x2ed101){const _0x2957c0=_0x43c7f8;_0x2ed101=_0x2ed101['replace'](/\x1b!/g,''),_0x2ed101=_0x2ed101[_0x2957c0(0x235)](/\x1b\|/g,''),_0x2ed101=_0x2ed101['replace'](/\x1b\./g,'');const _0x48bb6b=this[_0x2957c0(0x1f7)](_0x2ed101,0x0,0x0,0x0),_0x52c64d=this[_0x2957c0(0x238)]();return _0x48bb6b['drawing']=![],this[_0x2957c0(0x149)](_0x48bb6b),this[_0x2957c0(0x212)](_0x52c64d),{'width':_0x48bb6b[_0x2957c0(0xa1)],'height':_0x48bb6b[_0x2957c0(0xbb)]};},Window_Base[_0x43c7f8(0x242)]=VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x188)][_0x43c7f8(0x23b)][_0x43c7f8(0x133)]||0x0,Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0xbf)]=function(_0x228140){const _0x3c62ee=_0x43c7f8,_0x75c418=(_0x228140[_0x3c62ee(0x15b)]?-0x1:0x1)*this[_0x3c62ee(0x20b)]('\x20');_0x228140['x']+=_0x75c418;if(this[_0x3c62ee(0x98)](_0x228140)>0x0)_0x228140['x']+=_0x75c418;if(_0x228140[_0x3c62ee(0x15b)])return;let _0xf93857=_0x228140['text'][_0x3c62ee(0x10a)](_0x3c62ee(0x185),_0x228140[_0x3c62ee(0x75)]+0x1),_0x4e13c2=_0x228140[_0x3c62ee(0x186)][_0x3c62ee(0x10a)]('\x0a',_0x228140[_0x3c62ee(0x75)]+0x1);if(_0xf93857<0x0)_0xf93857=_0x228140[_0x3c62ee(0x186)]['length']+0x1;if(_0x4e13c2>0x0)_0xf93857=Math['min'](_0xf93857,_0x4e13c2);const _0x2a84b9=_0x228140['text'][_0x3c62ee(0x270)](_0x228140[_0x3c62ee(0x75)],_0xf93857),_0xcdcc97=this[_0x3c62ee(0x2dc)](_0x2a84b9)[_0x3c62ee(0x137)];let _0x233a52=_0x228140[_0x3c62ee(0x137)]||this[_0x3c62ee(0x288)];_0x233a52-=Window_Base[_0x3c62ee(0x242)];if(this[_0x3c62ee(0x1af)]===Window_Message){const _0x10ef67=$gameMessage[_0x3c62ee(0x138)]()===''?0x0:ImageManager[_0x3c62ee(0x247)]+0x14;_0x233a52-=_0x10ef67;if(VisuMZ[_0x3c62ee(0x2fa)]['Settings']['WordWrap']['TightWrap']){if(_0x3c62ee(0x2b5)===_0x3c62ee(0x7e))return![];else _0x233a52-=_0x10ef67;}}let _0x141730=![];if(_0x228140['x']+_0xcdcc97>_0x228140[_0x3c62ee(0x87)]+_0x233a52)_0x141730=!![];if(_0xcdcc97===0x0)_0x141730=!![];_0x141730&&(_0x228140['text']=_0x228140['text'][_0x3c62ee(0x216)](0x0,_0x228140['index'])+'\x0a'+_0x228140[_0x3c62ee(0x186)][_0x3c62ee(0x18e)](_0x228140[_0x3c62ee(0x75)]));},Window_Base[_0x43c7f8(0x21c)]['textSizeExWordWrap']=function(_0x251fd0){const _0x50bf35=_0x43c7f8,_0x45c0b5=this[_0x50bf35(0x1f7)](_0x251fd0,0x0,0x0,0x0),_0x1d43c8=this['getPreservedFontSettings']();return _0x45c0b5[_0x50bf35(0x314)]=![],this['setWordWrap'](![]),this[_0x50bf35(0x149)](_0x45c0b5),this[_0x50bf35(0x28b)](!![]),this[_0x50bf35(0x212)](_0x1d43c8),{'width':_0x45c0b5['outputWidth'],'height':_0x45c0b5[_0x50bf35(0xbb)]};},Window_Base[_0x43c7f8(0x21c)]['processCommonEvent']=function(_0x29c5bb){const _0x59bd69=_0x43c7f8;return this[_0x59bd69(0x98)](_0x29c5bb);},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x78)]=function(_0x129fbd){const _0x3b76ed=_0x43c7f8,_0x488f39=this[_0x3b76ed(0x294)](_0x129fbd)[_0x3b76ed(0xfd)](',');if(!_0x129fbd[_0x3b76ed(0x314)])return;const _0xca7009=_0x488f39[0x0][_0x3b76ed(0x2b2)](),_0x4949ca=_0x488f39[0x1]||0x0,_0x34f3ca=_0x488f39[0x2]||0x0,_0xd20c68=ImageManager[_0x3b76ed(0x2df)](_0xca7009),_0x12af16=this[_0x3b76ed(0x189)][_0x3b76ed(0x124)];_0xd20c68['addLoadListener'](this[_0x3b76ed(0x107)][_0x3b76ed(0x12a)](this,_0xd20c68,_0x129fbd['x'],_0x129fbd['y'],_0x4949ca,_0x34f3ca,_0x12af16));},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x107)]=function(_0x7e0ded,_0x1bc61d,_0x500af9,_0x2e0828,_0x4ebb56,_0x253c83){const _0xa2f7d0=_0x43c7f8;_0x2e0828=_0x2e0828||_0x7e0ded['width'],_0x4ebb56=_0x4ebb56||_0x7e0ded[_0xa2f7d0(0xb6)],this[_0xa2f7d0(0x246)]['paintOpacity']=_0x253c83,this[_0xa2f7d0(0x246)][_0xa2f7d0(0x2fc)](_0x7e0ded,0x0,0x0,_0x7e0ded[_0xa2f7d0(0x137)],_0x7e0ded[_0xa2f7d0(0xb6)],_0x1bc61d,_0x500af9,_0x2e0828,_0x4ebb56),this[_0xa2f7d0(0x246)]['paintOpacity']=0xff;},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x1c0)]=function(_0x597941){const _0xaeb5b1=_0x43c7f8,_0x298f1d=this['obtainEscapeString'](_0x597941)[_0xaeb5b1(0xfd)](',');if(!_0x597941[_0xaeb5b1(0x314)])return;const _0x202740=_0x298f1d[0x0]['trim'](),_0x10b09c=ImageManager[_0xaeb5b1(0x2df)](_0x202740),_0xf3b8b8=JsonEx[_0xaeb5b1(0xfa)](_0x597941),_0x2250c5=this[_0xaeb5b1(0x189)][_0xaeb5b1(0x124)];_0x10b09c[_0xaeb5b1(0x190)](this[_0xaeb5b1(0x1f5)][_0xaeb5b1(0x12a)](this,_0x10b09c,_0xf3b8b8,_0x2250c5));},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x1f5)]=function(_0x15c96a,_0x21a265,_0x30e78d){const _0x1a07a4=_0x43c7f8,_0x5b3512=_0x21a265[_0x1a07a4(0x137)]||this[_0x1a07a4(0x288)],_0x154fae=this[_0x1a07a4(0x1fe)]!==undefined?this[_0x1a07a4(0x9a)]():this[_0x1a07a4(0x117)],_0x121578=_0x5b3512/_0x15c96a[_0x1a07a4(0x137)],_0x14a208=_0x154fae/_0x15c96a[_0x1a07a4(0xb6)],_0x17f78c=Math[_0x1a07a4(0x17a)](_0x121578,_0x14a208,0x1),_0x3a8e3=this[_0x1a07a4(0x1fe)]!==undefined?(this[_0x1a07a4(0x251)](0x0)[_0x1a07a4(0xb6)]-this['lineHeight']())/0x2:0x0,_0x3282e3=_0x15c96a[_0x1a07a4(0x137)]*_0x17f78c,_0x20e162=_0x15c96a[_0x1a07a4(0xb6)]*_0x17f78c,_0x1e5ecb=Math[_0x1a07a4(0x91)]((_0x5b3512-_0x3282e3)/0x2)+_0x21a265[_0x1a07a4(0x87)],_0x206c8f=Math['floor']((_0x154fae-_0x20e162)/0x2)+_0x21a265['startY']-_0x3a8e3*0x2;this[_0x1a07a4(0x246)][_0x1a07a4(0x124)]=_0x30e78d,this[_0x1a07a4(0x246)][_0x1a07a4(0x2fc)](_0x15c96a,0x0,0x0,_0x15c96a[_0x1a07a4(0x137)],_0x15c96a[_0x1a07a4(0xb6)],_0x1e5ecb,_0x206c8f,_0x3282e3,_0x20e162),this[_0x1a07a4(0x246)][_0x1a07a4(0x124)]=0xff;},Window_Base['prototype'][_0x43c7f8(0x2f1)]=function(_0x46f3b5){const _0x5d19f4=_0x43c7f8,_0x5d1fb7=this[_0x5d19f4(0x98)](_0x46f3b5);if(_0x46f3b5[_0x5d19f4(0x314)])this[_0x5d19f4(0x19f)](_0x5d1fb7>0x0);},Window_Base[_0x43c7f8(0x21c)][_0x43c7f8(0x2af)]=function(_0x527015){const _0x2314d1=_0x43c7f8,_0x595b58=this[_0x2314d1(0x98)](_0x527015);if(this[_0x2314d1(0x1af)]===Window_Message&&_0x527015[_0x2314d1(0x314)]){if('ybSjW'===_0x2314d1(0x160))this[_0x2314d1(0x12e)](_0x595b58);else{const _0x176109=_0x565c9a['parse']('['+_0x427f9f['$1'][_0x2314d1(0x30d)](/\d+/g)+']');for(const _0x32a869 of _0x176109){if(!_0x553e83[_0x2314d1(0x24a)](_0x32a869))return!![];}return![];}}},Window_Help[_0x43c7f8(0x21c)][_0x43c7f8(0x240)]=function(){const _0x1582cc=_0x43c7f8;this[_0x1582cc(0x28b)]($gameSystem[_0x1582cc(0x289)]());},Window_Help[_0x43c7f8(0x21c)][_0x43c7f8(0x194)]=function(){return!![];},VisuMZ['MessageCore'][_0x43c7f8(0x201)]=Window_Help[_0x43c7f8(0x21c)][_0x43c7f8(0x73)],Window_Help[_0x43c7f8(0x21c)][_0x43c7f8(0x73)]=function(){const _0x1d2726=_0x43c7f8;this[_0x1d2726(0x1c7)](),VisuMZ['MessageCore']['Window_Help_refresh'][_0x1d2726(0x165)](this),this['resetWordWrap']();},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x2c5)]=Window_Options[_0x43c7f8(0x21c)][_0x43c7f8(0x253)],Window_Options['prototype'][_0x43c7f8(0x253)]=function(){const _0x183d58=_0x43c7f8;VisuMZ[_0x183d58(0x2fa)][_0x183d58(0x2c5)][_0x183d58(0x165)](this),this[_0x183d58(0x2e1)]();},Window_Options[_0x43c7f8(0x21c)][_0x43c7f8(0x2e1)]=function(){const _0x5381eb=_0x43c7f8;VisuMZ['MessageCore'][_0x5381eb(0x188)][_0x5381eb(0x2db)][_0x5381eb(0x20f)]&&this[_0x5381eb(0x29b)]();},Window_Options['prototype'][_0x43c7f8(0x29b)]=function(){const _0x13003f=_0x43c7f8,_0x5089d=TextManager[_0x13003f(0x2d7)],_0xf7cf63=_0x13003f(0x167);this[_0x13003f(0x8c)](_0x5089d,_0xf7cf63);},VisuMZ['MessageCore']['Window_Options_statusText']=Window_Options[_0x43c7f8(0x21c)][_0x43c7f8(0x2ef)],Window_Options[_0x43c7f8(0x21c)][_0x43c7f8(0x2ef)]=function(_0x4d520d){const _0xe8dba9=_0x43c7f8,_0x3d4bda=this['commandSymbol'](_0x4d520d);if(_0x3d4bda===_0xe8dba9(0x167))return this[_0xe8dba9(0x287)]();return VisuMZ[_0xe8dba9(0x2fa)]['Window_Options_statusText'][_0xe8dba9(0x165)](this,_0x4d520d);},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x2b1)]=Window_Options[_0x43c7f8(0x21c)][_0x43c7f8(0x284)],Window_Options['prototype'][_0x43c7f8(0x284)]=function(_0x223ae2){const _0x385fd1=_0x43c7f8;if(_0x223ae2===_0x385fd1(0x167))return!![];return VisuMZ['MessageCore'][_0x385fd1(0x2b1)][_0x385fd1(0x165)](this,_0x223ae2);},Window_Options[_0x43c7f8(0x21c)]['textSpeedStatusText']=function(){const _0x52b707=_0x43c7f8,_0x289b23=this[_0x52b707(0x2c2)](_0x52b707(0x167));return _0x289b23>0xa?TextManager[_0x52b707(0x1cc)]:_0x52b707(0x259)!==_0x52b707(0x2a4)?_0x289b23:(this['processAutoSize'](_0x2da8b4,!![],![]),this[_0x52b707(0x171)](_0x52b707(0x2b3)),'');},VisuMZ[_0x43c7f8(0x2fa)]['Window_Options_changeVolume']=Window_Options[_0x43c7f8(0x21c)][_0x43c7f8(0x2b6)],Window_Options[_0x43c7f8(0x21c)][_0x43c7f8(0x2b6)]=function(_0x844bed,_0x4ba6d6,_0x2f1517){const _0x3a9992=_0x43c7f8;if(_0x844bed===_0x3a9992(0x167))return this[_0x3a9992(0x2d3)](_0x844bed,_0x4ba6d6,_0x2f1517);VisuMZ[_0x3a9992(0x2fa)][_0x3a9992(0x297)][_0x3a9992(0x165)](this,_0x844bed,_0x4ba6d6,_0x2f1517);},Window_Options[_0x43c7f8(0x21c)][_0x43c7f8(0x2d3)]=function(_0x5b6449,_0xc2953d,_0x832b8){const _0x11db96=_0x43c7f8,_0x3a5ec8=this[_0x11db96(0x2c2)](_0x5b6449),_0xe74055=0x1,_0x4b2549=_0x3a5ec8+(_0xc2953d?_0xe74055:-_0xe74055);if(_0x4b2549>0xb&&_0x832b8){if('vZJUl'!==_0x11db96(0x2d0))this[_0x11db96(0x2f9)](_0x5b6449,0x1);else{const _0x17bacc=_0x5923c1[_0x11db96(0x2fa)][_0x11db96(0x260)]['call'](this);return _0x17bacc[_0x11db96(0x167)]=this['textSpeed'],_0x17bacc;}}else{if(_0x11db96(0x84)===_0x11db96(0x84))this['changeValue'](_0x5b6449,_0x4b2549['clamp'](0x1,0xb));else{const _0x2a4d8c=(_0x3d6b55['rtl']?-0x1:0x1)*this['textWidth']('\x20');_0x2aed0f['x']+=_0x2a4d8c;if(this[_0x11db96(0x98)](_0x52c23c)>0x0)_0x14f736['x']+=_0x2a4d8c;if(_0x4799ab[_0x11db96(0x15b)])return;let _0x468735=_0x50ed7e[_0x11db96(0x186)][_0x11db96(0x10a)](_0x11db96(0x185),_0x267368[_0x11db96(0x75)]+0x1),_0x2e70fe=_0x47f75b[_0x11db96(0x186)][_0x11db96(0x10a)]('\x0a',_0x235bfb[_0x11db96(0x75)]+0x1);if(_0x468735<0x0)_0x468735=_0x162360['text'][_0x11db96(0x29c)]+0x1;if(_0x2e70fe>0x0)_0x468735=_0xf17bf2['min'](_0x468735,_0x2e70fe);const _0x46efce=_0x1d2fed['text'][_0x11db96(0x270)](_0x5038ce[_0x11db96(0x75)],_0x468735),_0x184122=this[_0x11db96(0x2dc)](_0x46efce)['width'];let _0x3e9a15=_0x115421[_0x11db96(0x137)]||this[_0x11db96(0x288)];_0x3e9a15-=_0x95d004[_0x11db96(0x242)];if(this[_0x11db96(0x1af)]===_0x22271e){const _0x453196=_0x3b7fe3[_0x11db96(0x138)]()===''?0x0:_0x439f24['faceWidth']+0x14;_0x3e9a15-=_0x453196,_0xe65c2[_0x11db96(0x2fa)][_0x11db96(0x188)]['WordWrap'][_0x11db96(0x301)]&&(_0x3e9a15-=_0x453196);}let _0x4e20d2=![];if(_0x5a1687['x']+_0x184122>_0x285bc4[_0x11db96(0x87)]+_0x3e9a15)_0x4e20d2=!![];if(_0x184122===0x0)_0x4e20d2=!![];_0x4e20d2&&(_0x154f4f[_0x11db96(0x186)]=_0x3547c0[_0x11db96(0x186)][_0x11db96(0x216)](0x0,_0x4dbadc['index'])+'\x0a'+_0x475797[_0x11db96(0x186)][_0x11db96(0x18e)](_0x33af67['index']));}}},Window_Message[_0x43c7f8(0x21c)]['refreshDimmerBitmap']=function(){const _0x16698b=_0x43c7f8;Window_Base['prototype']['refreshDimmerBitmap']['call'](this),VisuMZ[_0x16698b(0x2fa)]['Settings'][_0x16698b(0x1e5)][_0x16698b(0x22b)]&&this[_0x16698b(0xd9)]();},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0xd9)]=function(){const _0x19c8aa=_0x43c7f8;this[_0x19c8aa(0x1fa)]['x']=Math[_0x19c8aa(0xd4)](this[_0x19c8aa(0x137)]/0x2),this[_0x19c8aa(0x1fa)]['anchor']['x']=0.5,this['_dimmerSprite'][_0x19c8aa(0xdb)]['x']=Graphics[_0x19c8aa(0x137)];},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x152)]=Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x86)],Window_Message[_0x43c7f8(0x21c)]['clearFlags']=function(){const _0x402128=_0x43c7f8;VisuMZ[_0x402128(0x2fa)][_0x402128(0x152)][_0x402128(0x165)](this),this[_0x402128(0x1c7)](),this[_0x402128(0x240)](),this[_0x402128(0x19f)](![]),this[_0x402128(0x2b7)](_0x402128(0x99)),this[_0x402128(0x81)](VisuMZ[_0x402128(0x2fa)][_0x402128(0x188)][_0x402128(0x1e5)][_0x402128(0x80)]);},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x240)]=function(){const _0xc6461b=_0x43c7f8;this['setWordWrap']($gameSystem[_0xc6461b(0x2e4)]());},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x194)]=function(){return!![];},Window_Message['prototype'][_0x43c7f8(0x81)]=function(_0x5e6d5a){const _0x5d90e0=_0x43c7f8,_0x8abb63=0xb-ConfigManager[_0x5d90e0(0x167)];_0x5e6d5a=Math[_0x5d90e0(0xd4)](_0x5e6d5a*_0x8abb63),this[_0x5d90e0(0x161)]=_0x5e6d5a,this['_textDelay']=_0x5e6d5a;},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x13a)]=Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x202)],Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x202)]=function(){const _0x54dc5d=_0x43c7f8;return VisuMZ[_0x54dc5d(0x2fa)][_0x54dc5d(0x13a)][_0x54dc5d(0x165)](this)||Input[_0x54dc5d(0x273)](VisuMZ[_0x54dc5d(0x2fa)]['Settings'][_0x54dc5d(0x1e5)][_0x54dc5d(0x296)]);},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x310)]=Window_Message[_0x43c7f8(0x21c)]['updatePlacement'],Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0xba)]=function(){const _0x1c6a53=_0x43c7f8;let _0x3b85a0=this['y'];VisuMZ['MessageCore'][_0x1c6a53(0x310)][_0x1c6a53(0x165)](this);if(this['_autoPositionTarget'])this['y']=_0x3b85a0;this[_0x1c6a53(0x25e)](),this[_0x1c6a53(0x264)]();},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x27d)]=Window_Message[_0x43c7f8(0x21c)]['newPage'],Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x228)]=function(_0x77a55b){const _0x1c5dd5=_0x43c7f8;this[_0x1c5dd5(0x20a)](_0x77a55b),this['onNewPageMessageCore'](_0x77a55b),VisuMZ['MessageCore'][_0x1c5dd5(0x27d)][_0x1c5dd5(0x165)](this,_0x77a55b),this[_0x1c5dd5(0x206)]();},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x20a)]=function(_0x3dbc0a){const _0x9f7a36=_0x43c7f8;if(!_0x3dbc0a)return;_0x3dbc0a[_0x9f7a36(0x186)]=Window_Base[_0x9f7a36(0x21c)][_0x9f7a36(0x307)][_0x9f7a36(0x165)](this,_0x3dbc0a[_0x9f7a36(0x186)]),_0x3dbc0a[_0x9f7a36(0x186)]=Window_Base[_0x9f7a36(0x21c)][_0x9f7a36(0xb2)][_0x9f7a36(0x165)](this,_0x3dbc0a['text']);},Window_Message['prototype'][_0x43c7f8(0x307)]=function(_0x54e415){return _0x54e415;},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0xb2)]=function(_0x3fb139){return _0x3fb139;},Window_Message[_0x43c7f8(0x21c)]['onNewPageMessageCore']=function(_0x3a0a8a){const _0x2c52b1=_0x43c7f8;this['prepareForcedPositionEscapeCharacters'](_0x3a0a8a),this[_0x2c52b1(0x19a)](_0x3a0a8a),this[_0x2c52b1(0x16d)]();},VisuMZ[_0x43c7f8(0x2fa)]['Window_Message_terminateMessage']=Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x155)],Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x155)]=function(){const _0x253a98=_0x43c7f8;VisuMZ['MessageCore'][_0x253a98(0x2cc)][_0x253a98(0x165)](this),this[_0x253a98(0x86)]();if(this['_messagePositionReset'])this[_0x253a98(0xa8)]();},Window_Message[_0x43c7f8(0x21c)]['updateDimensions']=function(){const _0x10b616=_0x43c7f8;this['width']=$gameSystem[_0x10b616(0x2f8)]()+this[_0x10b616(0x1e2)]();;this[_0x10b616(0x137)]=Math['min'](Graphics[_0x10b616(0x137)],this['width']);const _0x3421fd=$gameSystem[_0x10b616(0x97)]();this[_0x10b616(0xb6)]=SceneManager['_scene'][_0x10b616(0xc5)](_0x3421fd,![])+this[_0x10b616(0x173)](),this[_0x10b616(0xb6)]=Math[_0x10b616(0x17a)](Graphics['height'],this[_0x10b616(0xb6)]);if($gameTemp['_centerMessageWindow'])this[_0x10b616(0x226)]();},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x1e2)]=function(){return 0x0;},Window_Message['prototype'][_0x43c7f8(0x173)]=function(){return 0x0;},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x226)]=function(){const _0x7b2d=_0x43c7f8;this['x']=(Graphics['boxWidth']-this[_0x7b2d(0x137)])/0x2,$gameTemp[_0x7b2d(0xd7)]=undefined,this[_0x7b2d(0x264)]();},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x17c)]=function(){const _0x30462a=_0x43c7f8,_0x505b19={'x':this['x'],'y':this['y']};Window_Base[_0x30462a(0x21c)][_0x30462a(0x17c)][_0x30462a(0x165)](this),this['updateNameBoxMove'](_0x505b19);},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x2fb)]=function(){return!![];},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x18b)]=function(_0x115572){const _0x4a9e02=_0x43c7f8;if(this[_0x4a9e02(0x262)]){if(_0x4a9e02(0x7b)!==_0x4a9e02(0x7b))return this[_0x4a9e02(0xe4)]?this[_0x4a9e02(0x2c8)]():_0x3ee485[_0x4a9e02(0x2fa)][_0x4a9e02(0x145)]['call'](this);else this[_0x4a9e02(0x262)]['x']+=this['x']-_0x115572['x'],this[_0x4a9e02(0x262)]['y']+=this['y']-_0x115572['y'];}},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x24b)]=function(_0x50a255,_0x2ae3a2){const _0x272e61=_0x43c7f8;this[_0x272e61(0x217)](this[_0x272e61(0x14a)]['x'],this[_0x272e61(0xfb)]*(Graphics['boxHeight']-this['height'])/0x2,this[_0x272e61(0x14a)][_0x272e61(0x137)],this[_0x272e61(0x14a)][_0x272e61(0xb6)],_0x50a255,_0x2ae3a2);},Window_Message[_0x43c7f8(0x21c)]['processCommonEvent']=function(_0x1ad256){const _0x1c8cab=_0x43c7f8,_0x167c46=Window_Base[_0x1c8cab(0x21c)]['processCommonEvent'][_0x1c8cab(0x165)](this,_0x1ad256);_0x1ad256['drawing']&&this[_0x1c8cab(0xdd)](_0x167c46);},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0xdd)]=function(_0x41cd92){const _0x5d5ce7=_0x43c7f8;if($gameParty[_0x5d5ce7(0x30e)]()){}else $gameMap['addMessageCommonEvent'](_0x41cd92);},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x143)]=function(_0xba419b){const _0x2c202f=_0x43c7f8;this[_0x2c202f(0x161)]--,this['_textDelayCount']<=0x0&&(this[_0x2c202f(0xc0)](_0xba419b),Window_Base[_0x2c202f(0x21c)][_0x2c202f(0x143)]['call'](this,_0xba419b));},Window_Message['prototype'][_0x43c7f8(0xc0)]=function(_0xa3a84d){const _0x4ae579=_0x43c7f8;this[_0x4ae579(0x161)]=this['_textDelay'];if(this[_0x4ae579(0xbc)]<=0x0)this[_0x4ae579(0x184)]=!![];},VisuMZ[_0x43c7f8(0x2fa)]['Window_Message_processEscapeCharacter']=Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x23c)],Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x23c)]=function(_0x28e436,_0x4a7f58){const _0x26a638=_0x43c7f8;!_0x4a7f58['drawing']?Window_Base[_0x26a638(0x21c)][_0x26a638(0x23c)][_0x26a638(0x165)](this,_0x28e436,_0x4a7f58):VisuMZ[_0x26a638(0x2fa)]['Window_Message_processEscapeCharacter'][_0x26a638(0x165)](this,_0x28e436,_0x4a7f58);},Window_Message[_0x43c7f8(0x21c)]['prepareForcedPositionEscapeCharacters']=function(_0x1529a4){const _0x54d78f=_0x43c7f8;let _0x2133a2=_0x1529a4[_0x54d78f(0x186)];this[_0x54d78f(0x2f3)]={};if(this[_0x54d78f(0x25a)]())return _0x2133a2;_0x2133a2=_0x2133a2[_0x54d78f(0x235)](/<POSITION:[ ]*(.*)>/gi,(_0xa4a903,_0x54e9cc)=>{const _0x1b3966=_0x54d78f;if(_0x1b3966(0x132)!==_0x1b3966(0x132)){_0xcb41ea[_0x1b3966(0x2fa)]['ParseEnemyNotetags'][_0x1b3966(0x165)](this,_0x45451c);const _0x298a56=_0x17cee1['MessageCore']['Settings'][_0x1b3966(0x263)];_0x544518[_0x1b3966(0x2fa)][_0x1b3966(0x311)](_0x1eab10,_0x298a56[_0x1b3966(0x2a0)]);}else{const _0x180bcc=_0x54e9cc['split'](',')[_0x1b3966(0x172)](_0x43f54d=>Number(_0x43f54d)||0x0);if(_0x180bcc[0x0]!==undefined)this[_0x1b3966(0x2f3)]['x']=Number(_0x180bcc[0x0]);if(_0x180bcc[0x1]!==undefined)this[_0x1b3966(0x2f3)]['y']=Number(_0x180bcc[0x1]);if(_0x180bcc[0x2]!==undefined)this[_0x1b3966(0x2f3)][_0x1b3966(0x137)]=Number(_0x180bcc[0x2]);if(_0x180bcc[0x3]!==undefined)this[_0x1b3966(0x2f3)][_0x1b3966(0xb6)]=Number(_0x180bcc[0x3]);return'';}}),_0x2133a2=_0x2133a2[_0x54d78f(0x235)](/<COORDINATES:[ ]*(.*)>/gi,(_0x31b59d,_0x2612c4)=>{const _0x471ae9=_0x54d78f,_0x541d35=_0x2612c4[_0x471ae9(0xfd)](',')[_0x471ae9(0x172)](_0x29f4d1=>Number(_0x29f4d1)||0x0);if(_0x541d35[0x0]!==undefined)this[_0x471ae9(0x2f3)]['x']=Number(_0x541d35[0x0]);if(_0x541d35[0x1]!==undefined)this[_0x471ae9(0x2f3)]['y']=Number(_0x541d35[0x1]);return'';}),_0x2133a2=_0x2133a2['replace'](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x1da906,_0x250ec6)=>{const _0x4f742d=_0x54d78f,_0x516c7d=_0x250ec6[_0x4f742d(0xfd)](',')[_0x4f742d(0x172)](_0x376c62=>Number(_0x376c62)||0x0);if(_0x516c7d[0x0]!==undefined)this[_0x4f742d(0x2f3)][_0x4f742d(0x137)]=Number(_0x516c7d[0x2]);if(_0x516c7d[0x1]!==undefined)this['_forcedPosition'][_0x4f742d(0xb6)]=Number(_0x516c7d[0x3]);return'';}),_0x1529a4[_0x54d78f(0x186)]=_0x2133a2;},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x25e)]=function(){const _0x4c31ba=_0x43c7f8;this[_0x4c31ba(0x2f3)]=this[_0x4c31ba(0x2f3)]||{};const _0x4ea357=['x','y','width',_0x4c31ba(0xb6)];for(const _0x71b947 of _0x4ea357){this[_0x4c31ba(0x2f3)][_0x71b947]!==undefined&&(this[_0x71b947]=Number(this[_0x4c31ba(0x2f3)][_0x71b947]));}},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x19a)]=function(_0x3df237){const _0x2d4294=_0x43c7f8;let _0x33f1d4=_0x3df237[_0x2d4294(0x186)];_0x33f1d4=_0x33f1d4[_0x2d4294(0x235)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x23e59e=_0x2d4294;if(_0x23e59e(0x1b0)==='GcUWm')return this[_0x23e59e(0x29e)](_0x33f1d4,!![],!![]),this[_0x23e59e(0x171)]('none'),'';else{for(const _0xabf39a of _0x414d76['parameters'][0x0]){this[_0x23e59e(0x2f0)][_0x420280][_0x23e59e(0x20c)][0x0][_0x23e59e(0x2d5)](_0xabf39a);}this['_list']['splice'](this[_0x23e59e(0x1fe)]-0x1,0x2);}}),_0x33f1d4=_0x33f1d4[_0x2d4294(0x235)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x38fc6d=_0x2d4294;return this[_0x38fc6d(0x29e)](_0x33f1d4,!![],![]),this[_0x38fc6d(0x171)](_0x38fc6d(0x2b3)),'';}),_0x33f1d4=_0x33f1d4[_0x2d4294(0x235)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x61442d=_0x2d4294;return this[_0x61442d(0x29e)](_0x33f1d4,![],!![]),this['processAutoPosition']('none'),'';});if(SceneManager[_0x2d4294(0x23a)]())_0x2d4294(0x252)!==_0x2d4294(0x24f)?(_0x33f1d4=_0x33f1d4[_0x2d4294(0x235)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x4ab576,_0x2b5582)=>{const _0x5785f9=_0x2d4294;if(_0x5785f9(0x2d6)!==_0x5785f9(0x2d6)){if(this['_MessageCoreSettings']===_0x6fd5eb)this[_0x5785f9(0x30f)]();if(this[_0x5785f9(0x1d3)]['messageWidth']===_0x3ccb18)this[_0x5785f9(0x30f)]();_0x39f869=_0x1c731b[_0x5785f9(0x193)](_0x2f9196);if(_0x332661%0x2!==0x0)_0x1700d5+=0x1;this[_0x5785f9(0x1d3)][_0x5785f9(0x266)]=_0x35ed4f||0x2;}else return this['processAutoSize'](_0x33f1d4,!![],!![]),this[_0x5785f9(0x171)](_0x5785f9(0x312),Number(_0x2b5582)||0x1),'';}),_0x33f1d4=_0x33f1d4[_0x2d4294(0x235)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x235e2f,_0x5e9e61)=>{const _0x3e13fe=_0x2d4294;return this['processAutoSize'](_0x33f1d4,!![],!![]),this[_0x3e13fe(0x171)](_0x3e13fe(0xd3),Number(_0x5e9e61)||0x0),'';}),_0x33f1d4=_0x33f1d4[_0x2d4294(0x235)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x12a093,_0x33a8a8)=>{const _0x120c8e=_0x2d4294;return this[_0x120c8e(0x29e)](_0x33f1d4,!![],!![]),this[_0x120c8e(0x171)](_0x120c8e(0x16b),Number(_0x33a8a8)||0x0),'';})):this[_0x2d4294(0x2a1)]();else{if(SceneManager['isSceneMap']()){if(_0x2d4294(0x129)==='EvwDn')_0x33f1d4=_0x33f1d4[_0x2d4294(0x235)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x7b7160,_0x2dbc8b)=>{const _0x2eb174=_0x2d4294;return this[_0x2eb174(0x29e)](_0x33f1d4,!![],!![]),this[_0x2eb174(0x171)](_0x2eb174(0x76),0x0),'';}),_0x33f1d4=_0x33f1d4[_0x2d4294(0x235)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0xc2dd41,_0x32e4c9)=>{const _0x3bde81=_0x2d4294;if('pqMgh'===_0x3bde81(0x162))return this['processAutoSize'](_0x33f1d4,!![],!![]),this[_0x3bde81(0x171)](_0x3bde81(0x1e4),Number(_0x32e4c9)||0x1),'';else this[_0x3bde81(0xdd)](_0x2dbd15);}),_0x33f1d4=_0x33f1d4[_0x2d4294(0x235)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x17c813,_0x513fed)=>{const _0x280be9=_0x2d4294;return this[_0x280be9(0x29e)](_0x33f1d4,!![],!![]),this[_0x280be9(0x171)](_0x280be9(0x176),Number(_0x513fed)||0x0),'';}),_0x33f1d4=_0x33f1d4[_0x2d4294(0x235)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x14dda8,_0x57f975)=>{const _0x4cb9d2=_0x2d4294;return this[_0x4cb9d2(0x29e)](_0x33f1d4,!![],!![]),this['processAutoPosition']('map\x20event',Number(_0x57f975)||0x0),'';});else return _0x385365['index']+=_0x33be42[0x0][_0x2d4294(0x29c)],_0x23de39(_0x3e25f6[0x0][_0x2d4294(0x216)](0x1,_0x4f0a0e[0x0][_0x2d4294(0x29c)]-0x1));}}_0x3df237[_0x2d4294(0x186)]=_0x33f1d4;},Window_Message[_0x43c7f8(0x271)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x43c7f8(0x1db)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x29e)]=function(_0xffd83b,_0x3ec711,_0x58ec94){const _0x4a72db=_0x43c7f8;_0xffd83b=_0xffd83b[_0x4a72db(0x235)](Window_Message[_0x4a72db(0x271)],''),_0xffd83b=_0xffd83b[_0x4a72db(0x235)](Window_Message[_0x4a72db(0x1db)],''),this[_0x4a72db(0x2ca)]=!![];const _0x4ff488=this[_0x4a72db(0x291)](_0xffd83b);if(_0x3ec711){if(_0x4a72db(0x1b3)!=='OhPKL'){let _0x352637=_0x4ff488[_0x4a72db(0x137)]+$gameSystem[_0x4a72db(0x2f7)]()*0x2+0x6;const _0x11557e=$gameMessage[_0x4a72db(0x138)]()!=='',_0x44e1f9=ImageManager[_0x4a72db(0x247)],_0x484d7d=0x14;_0x352637+=_0x11557e?_0x44e1f9+_0x484d7d:0x4;if(_0x352637%0x2!==0x0)_0x352637+=0x1;$gameSystem[_0x4a72db(0x1bf)](_0x352637);}else _0x3949c8[_0x4a72db(0x248)]=0x3;}if(_0x58ec94){let _0x539470=Math['ceil'](_0x4ff488[_0x4a72db(0xb6)]/this[_0x4a72db(0x2b4)]());$gameSystem[_0x4a72db(0xd1)](_0x539470);}this[_0x4a72db(0x281)](),this[_0x4a72db(0x2ca)]=![],this[_0x4a72db(0x249)]=!![];},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x281)]=function(){const _0x36916c=_0x43c7f8;this[_0x36916c(0x16d)](),this['updatePlacement'](),this[_0x36916c(0x226)](),this[_0x36916c(0x131)](),this[_0x36916c(0x189)][_0x36916c(0x209)](),this['createContents']();},Window_Message['prototype'][_0x43c7f8(0x171)]=function(_0x361e68,_0x3f636c){const _0x1e3f5d=_0x43c7f8;switch(_0x361e68[_0x1e3f5d(0xec)]()['trim']()){case _0x1e3f5d(0x312):this[_0x1e3f5d(0xed)]=$gameActors[_0x1e3f5d(0x13d)](_0x3f636c);break;case _0x1e3f5d(0xd3):this['_autoPositionTarget']=$gameParty[_0x1e3f5d(0x71)]()[_0x3f636c-0x1];break;case _0x1e3f5d(0x16b):this[_0x1e3f5d(0xed)]=$gameTroop[_0x1e3f5d(0x71)]()[_0x3f636c-0x1];break;case _0x1e3f5d(0x76):this[_0x1e3f5d(0xed)]=$gamePlayer;break;case _0x1e3f5d(0x1e4):const _0x1edb53=$gameActors[_0x1e3f5d(0x13d)](_0x3f636c)['index']();_0x1edb53===0x0?this[_0x1e3f5d(0xed)]=$gamePlayer:this[_0x1e3f5d(0xed)]=$gamePlayer[_0x1e3f5d(0x116)]()[_0x1e3f5d(0x214)](_0x1edb53-0x1);break;case _0x1e3f5d(0x176):_0x3f636c===0x1?this[_0x1e3f5d(0xed)]=$gamePlayer:this['_autoPositionTarget']=$gamePlayer[_0x1e3f5d(0x116)]()['follower'](_0x3f636c-0x2);break;case _0x1e3f5d(0x2e0):this[_0x1e3f5d(0xed)]=$gameMap['event'](_0x3f636c);break;}if(this['_autoPositionTarget']){if(_0x1e3f5d(0x255)!==_0x1e3f5d(0x1f0))this['updateAutoPosition']();else{this[_0x1e3f5d(0x2c1)]=this['x']+_0x329ef3,this['_moveTargetY']=this['y']+_0x3e52d8,this[_0x1e3f5d(0x1f4)]=this[_0x1e3f5d(0x137)]+(_0x55f982||0x0),this[_0x1e3f5d(0x1f2)]=this[_0x1e3f5d(0xb6)]+(_0x270cab||0x0),this[_0x1e3f5d(0x16c)]=_0x545521||0x1;if(this[_0x1e3f5d(0x16c)]<=0x0)this['_moveDuration']=0x1;this[_0x1e3f5d(0x276)]=this['_moveDuration'],this[_0x1e3f5d(0x103)]=_0x4aee43||0x0;if(_0x165d29<=0x0)this['updateMove']();}}},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x21a)]=Window_Message[_0x43c7f8(0x21c)]['synchronizeNameBox'],Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x170)]=function(){this['updateAutoPosition'](),VisuMZ['MessageCore']['Window_Message_synchronizeNameBox']['call'](this);},Window_Message[_0x43c7f8(0x21c)]['updateAutoPosition']=function(){const _0x3af4dc=_0x43c7f8;if(!this[_0x3af4dc(0xed)])return;const _0x3c90dc=SceneManager['_scene'];if(!_0x3c90dc)return;if(!_0x3c90dc[_0x3af4dc(0x112)])return;const _0x33ce52=_0x3c90dc[_0x3af4dc(0x112)][_0x3af4dc(0x146)](this[_0x3af4dc(0xed)]);if(!_0x33ce52)return;let _0x1a7011=_0x33ce52['x'];_0x1a7011-=this[_0x3af4dc(0x137)]/0x2,_0x1a7011-=(Graphics[_0x3af4dc(0x137)]-Graphics[_0x3af4dc(0x2a2)])/0x2;let _0x301db3=_0x33ce52['y'];_0x301db3-=this[_0x3af4dc(0xb6)],_0x301db3-=(Graphics[_0x3af4dc(0xb6)]-Graphics[_0x3af4dc(0xaa)])/0x2,_0x301db3-=_0x33ce52[_0x3af4dc(0xb6)]+0x8,this['x']=Math[_0x3af4dc(0xd4)](_0x1a7011),this['y']=Math['round'](_0x301db3),this[_0x3af4dc(0x264)](!![],![]),this[_0x3af4dc(0x262)][_0x3af4dc(0xba)]();},Window_Message[_0x43c7f8(0x21c)]['messagePositionReset']=function(){const _0x21728c=_0x43c7f8;this[_0x21728c(0x249)]=![],this[_0x21728c(0xed)]=undefined,$gameSystem['initMessageCore'](),this[_0x21728c(0x281)](),this[_0x21728c(0x237)]=0x0;},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x215)]=function(_0x4ea2b8){const _0x1522e2=_0x43c7f8;return Window_Base[_0x1522e2(0x21c)][_0x1522e2(0x215)][_0x1522e2(0x165)](this,_0x4ea2b8);},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x2b9)]=function(_0xf9d6ff){const _0x468c3d=_0x43c7f8;return Window_Base[_0x468c3d(0x21c)][_0x468c3d(0x2b9)][_0x468c3d(0x165)](this,_0xf9d6ff);},Window_Message[_0x43c7f8(0x21c)]['flushTextState']=function(_0x516e3e){const _0x366bfa=_0x43c7f8;this[_0x366bfa(0x1e1)](_0x516e3e),Window_Base[_0x366bfa(0x21c)]['flushTextState'][_0x366bfa(0x165)](this,_0x516e3e),this[_0x366bfa(0x1c3)](_0x516e3e);},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x1e1)]=function(_0x2074c2){},Window_Message[_0x43c7f8(0x21c)][_0x43c7f8(0x1c3)]=function(_0x1e344b){},Window_NameBox[_0x43c7f8(0x21c)][_0x43c7f8(0x194)]=function(){return![];},Window_NameBox[_0x43c7f8(0x21c)][_0x43c7f8(0x199)]=function(){const _0x52d450=_0x43c7f8;Window_Base['prototype'][_0x52d450(0x199)][_0x52d450(0x165)](this),this['changeTextColor'](this[_0x52d450(0x2ae)]());},Window_NameBox[_0x43c7f8(0x21c)]['defaultColor']=function(){const _0x193b1d=_0x43c7f8,_0x4103c0=VisuMZ['MessageCore'][_0x193b1d(0x188)]['General'][_0x193b1d(0x239)];return ColorManager[_0x193b1d(0x122)](_0x4103c0);},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x1ec)]=Window_NameBox[_0x43c7f8(0x21c)][_0x43c7f8(0xba)],Window_NameBox[_0x43c7f8(0x21c)][_0x43c7f8(0xba)]=function(){const _0x4b721f=_0x43c7f8;VisuMZ['MessageCore'][_0x4b721f(0x1ec)][_0x4b721f(0x165)](this),this[_0x4b721f(0x306)](),this[_0x4b721f(0x144)](),this[_0x4b721f(0x264)](),this[_0x4b721f(0x2c6)]();},Window_NameBox[_0x43c7f8(0x21c)][_0x43c7f8(0x215)]=function(_0x570ad1){const _0x4ec6bb=_0x43c7f8;return _0x570ad1=_0x570ad1[_0x4ec6bb(0x235)](/<LEFT>/gi,this[_0x4ec6bb(0x180)]['bind'](this,0x0)),_0x570ad1=_0x570ad1[_0x4ec6bb(0x235)](/<CENTER>/gi,this[_0x4ec6bb(0x180)][_0x4ec6bb(0x12a)](this,0x5)),_0x570ad1=_0x570ad1[_0x4ec6bb(0x235)](/<RIGHT>/gi,this[_0x4ec6bb(0x180)][_0x4ec6bb(0x12a)](this,0xa)),_0x570ad1=_0x570ad1[_0x4ec6bb(0x235)](/<POSITION:[ ](\d+)>/gi,(_0xd34658,_0x4abe2c)=>this[_0x4ec6bb(0x180)](parseInt(_0x4abe2c))),_0x570ad1=_0x570ad1[_0x4ec6bb(0x235)](/<\/LEFT>/gi,''),_0x570ad1=_0x570ad1[_0x4ec6bb(0x235)](/<\/CENTER>/gi,''),_0x570ad1=_0x570ad1[_0x4ec6bb(0x235)](/<\/RIGHT>/gi,''),Window_Base['prototype'][_0x4ec6bb(0x215)]['call'](this,_0x570ad1);},Window_NameBox[_0x43c7f8(0x21c)][_0x43c7f8(0x180)]=function(_0x418f08){const _0x56dd40=_0x43c7f8;return this[_0x56dd40(0x10f)]=_0x418f08,'';},Window_NameBox[_0x43c7f8(0x21c)][_0x43c7f8(0x306)]=function(){const _0x46490d=_0x43c7f8;if($gameMessage[_0x46490d(0x1f9)]())return;this[_0x46490d(0x10f)]=this['_relativePosition']||0x0;const _0xa001c3=this[_0x46490d(0xe4)],_0x435d62=Math[_0x46490d(0x91)](_0xa001c3['width']*this['_relativePosition']/0xa);this['x']=_0xa001c3['x']+_0x435d62-Math['floor'](this['width']/0x2),this['x']=this['x']['clamp'](_0xa001c3['x'],_0xa001c3['x']+_0xa001c3['width']-this[_0x46490d(0x137)]);},Window_NameBox[_0x43c7f8(0x21c)]['updateOffsetPosition']=function(){const _0x404ef2=_0x43c7f8;if($gameMessage[_0x404ef2(0x1f9)]())return;this[_0x404ef2(0x10f)]=this[_0x404ef2(0x10f)]||0x0;const _0x44face=VisuMZ[_0x404ef2(0x2fa)]['Settings']['General']['NameBoxWindowOffsetX'],_0x4592d7=VisuMZ[_0x404ef2(0x2fa)]['Settings'][_0x404ef2(0x1e5)][_0x404ef2(0x19d)],_0x102568=(0x5-this[_0x404ef2(0x10f)])/0x5;this['x']+=Math['floor'](_0x44face*_0x102568),this['y']+=_0x4592d7;},Window_NameBox[_0x43c7f8(0x21c)][_0x43c7f8(0x2c6)]=function(){const _0x990272=_0x43c7f8,_0x1c23b4=this['_messageWindow'],_0x4117e4=_0x1c23b4['y'],_0x693f1e=VisuMZ['MessageCore'][_0x990272(0x188)]['General'][_0x990272(0x19d)];_0x4117e4>this['y']&&_0x4117e4<this['y']+this[_0x990272(0xb6)]-_0x693f1e&&(this['y']=_0x1c23b4['y']+_0x1c23b4[_0x990272(0xb6)]);},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x163)]=Window_NameBox[_0x43c7f8(0x21c)][_0x43c7f8(0x73)],Window_NameBox['prototype'][_0x43c7f8(0x73)]=function(){const _0x4a6432=_0x43c7f8;this[_0x4a6432(0x10f)]=0x0,VisuMZ[_0x4a6432(0x2fa)][_0x4a6432(0x163)][_0x4a6432(0x165)](this);},Window_ChoiceList['prototype'][_0x43c7f8(0x25a)]=function(){return![];},Window_ChoiceList[_0x43c7f8(0x21c)]['isAutoColorAffected']=function(){return!![];},Window_ChoiceList[_0x43c7f8(0x21c)][_0x43c7f8(0x9a)]=function(){const _0x2bb4b5=_0x43c7f8;return $gameSystem[_0x2bb4b5(0x142)]()+0x8;},Window_ChoiceList['prototype'][_0x43c7f8(0x2ff)]=function(){const _0x4cfcb1=_0x43c7f8;return $gameSystem[_0x4cfcb1(0xaf)]();},Window_ChoiceList[_0x43c7f8(0x21c)][_0x43c7f8(0x218)]=function(){const _0x4c98bd=_0x43c7f8;this[_0x4c98bd(0x73)](),this[_0x4c98bd(0x269)](),this['open'](),this['activate']();},Window_ChoiceList['prototype']['refresh']=function(){const _0x4a79a0=_0x43c7f8;this[_0x4a79a0(0x2f2)](),this[_0x4a79a0(0x220)]();if(this[_0x4a79a0(0xe4)]){if(_0x4a79a0(0xa4)!=='bplYQ'){const _0x423dcd=_0x4df702[_0x4a79a0(0x2fa)][_0x4a79a0(0x188)][_0x4a79a0(0x263)];!_0x2ec65a[_0x4a79a0(0xd5)]&&(_0x22dcad[_0x4a79a0(0x2fa)][_0x4a79a0(0x19b)](_0x4201ec,_0x423dcd[_0x4a79a0(0x195)]),_0x2b6f4b[_0x4a79a0(0x2fa)][_0x4a79a0(0x19b)](_0x211b47,_0x423dcd['Skills']),_0x7cd5c7['MessageCore'][_0x4a79a0(0x19b)](_0x17ded2,_0x423dcd[_0x4a79a0(0x114)]),_0x307d60[_0x4a79a0(0x2fa)][_0x4a79a0(0x19b)](_0x243e37,_0x423dcd[_0x4a79a0(0x94)]),_0x175b97[_0x4a79a0(0x2fa)][_0x4a79a0(0x19b)](_0xa3a27c,_0x423dcd[_0x4a79a0(0x21b)]),_0x116430[_0x4a79a0(0x2fa)]['AddAutoColor'](_0x1e0d7a,_0x423dcd['Enemies']),_0x25b5ca[_0x4a79a0(0x2fa)][_0x4a79a0(0x19b)](_0x4af85e,_0x423dcd[_0x4a79a0(0x92)])),_0x278cae['MessageCore']['CreateAutoColorRegExpLists']();}else this[_0x4a79a0(0xba)](),this['placeCancelButton']();}this[_0x4a79a0(0x206)](),this[_0x4a79a0(0xa7)](),this[_0x4a79a0(0x169)](),Window_Selectable[_0x4a79a0(0x21c)][_0x4a79a0(0x73)][_0x4a79a0(0x165)](this);},Window_ChoiceList[_0x43c7f8(0x21c)][_0x43c7f8(0x220)]=function(){const _0xd0ec4a=_0x43c7f8,_0x1bb9c7=$gameMessage[_0xd0ec4a(0x1a7)]();let _0x17ab30=0x0;for(let _0x123024 of _0x1bb9c7){if(_0xd0ec4a(0x14b)===_0xd0ec4a(0xe6))return this[_0xd0ec4a(0xf6)];else{_0x123024=this[_0xd0ec4a(0x308)](_0x123024);if(this[_0xd0ec4a(0x28d)](_0x123024)){const _0x518c86=this[_0xd0ec4a(0x26d)](_0x123024),_0x28c355=this[_0xd0ec4a(0xa0)](_0x123024);this[_0xd0ec4a(0x8c)](_0x518c86,_0xd0ec4a(0x17d),_0x28c355,_0x17ab30);}_0x17ab30++;}}},Window_ChoiceList[_0x43c7f8(0x21c)][_0x43c7f8(0x308)]=function(_0x96c705){const _0x20b3f8=_0x43c7f8;return Window_Base[_0x20b3f8(0x21c)][_0x20b3f8(0x307)][_0x20b3f8(0x165)](this,_0x96c705);},Window_ChoiceList[_0x43c7f8(0x21c)][_0x43c7f8(0x307)]=function(_0x3745c9){return _0x3745c9;},Window_ChoiceList[_0x43c7f8(0x21c)][_0x43c7f8(0x28d)]=function(_0x1215af){const _0x21fd70=_0x43c7f8;if(_0x1215af[_0x21fd70(0x30d)](/<HIDE>/i))return![];if(_0x1215af[_0x21fd70(0x30d)](/<SHOW>/i))return!![];if(_0x1215af[_0x21fd70(0x30d)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x48fda1=JSON[_0x21fd70(0x22f)]('['+RegExp['$1'][_0x21fd70(0x30d)](/\d+/g)+']');for(const _0x3575f6 of _0x48fda1){if(!$gameSwitches[_0x21fd70(0x24a)](_0x3575f6))return![];}return!![];}if(_0x1215af['match'](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x283223=JSON[_0x21fd70(0x22f)]('['+RegExp['$1'][_0x21fd70(0x30d)](/\d+/g)+']');for(const _0x1ba1b9 of _0x283223){if(_0x21fd70(0x111)===_0x21fd70(0x2ea)){if(this['_MessageCoreSettings']===_0x537356)this[_0x21fd70(0x30f)]();if(this['_MessageCoreSettings'][_0x21fd70(0x9b)]===_0x399289)this[_0x21fd70(0x30f)]();return this[_0x21fd70(0x1d3)][_0x21fd70(0x9b)];}else{if(!$gameSwitches[_0x21fd70(0x24a)](_0x1ba1b9))return![];}}return!![];}if(_0x1215af[_0x21fd70(0x30d)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x21fd70(0xda)===_0x21fd70(0x18a))this[_0x21fd70(0x265)](_0x2ca7a8,this[_0x21fd70(0x2a7)](),_0x3c57ee),this[_0x21fd70(0x1fe)]-=0x2;else{const _0x441ed0=JSON[_0x21fd70(0x22f)]('['+RegExp['$1'][_0x21fd70(0x30d)](/\d+/g)+']');for(const _0x1ba554 of _0x441ed0){if($gameSwitches[_0x21fd70(0x24a)](_0x1ba554))return!![];}return![];}}if(_0x1215af[_0x21fd70(0x30d)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5c8b42=JSON[_0x21fd70(0x22f)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x7575dd of _0x5c8b42){if(_0x21fd70(0x290)===_0x21fd70(0x290)){if(!$gameSwitches[_0x21fd70(0x24a)](_0x7575dd))return!![];}else{const _0x459a7f=_0x38bb31[_0x21fd70(0x2fa)][_0x21fd70(0x188)][_0x21fd70(0x1e5)][_0x21fd70(0x239)];return _0x4924c6[_0x21fd70(0x122)](_0x459a7f);}}return![];}if(_0x1215af[_0x21fd70(0x30d)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('yZbNc'==='NxCBW'){if(this['_MessageCoreSettings']===_0x2a11fb)this['initMessageCore']();if(this[_0x21fd70(0x1d3)][_0x21fd70(0x1fc)]===_0x664659)this[_0x21fd70(0x30f)]();return this[_0x21fd70(0x1d3)][_0x21fd70(0x1fc)];}else{const _0x2d90cd=JSON[_0x21fd70(0x22f)]('['+RegExp['$1'][_0x21fd70(0x30d)](/\d+/g)+']');for(const _0x38c3d6 of _0x2d90cd){if(_0x21fd70(0x1e0)==='zZkeC'){if(!$gameSwitches[_0x21fd70(0x24a)](_0x38c3d6))return!![];}else this[_0x21fd70(0xed)]=_0x3ec374;}return![];}}if(_0x1215af['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4af2d6=JSON['parse']('['+RegExp['$1'][_0x21fd70(0x30d)](/\d+/g)+']');for(const _0x46af37 of _0x4af2d6){if(_0x21fd70(0x177)==='UGZco'){if(_0x57107c[_0x21fd70(0x1f9)]())return;this[_0x21fd70(0x10f)]=this[_0x21fd70(0x10f)]||0x0;const _0x41aeb9=this[_0x21fd70(0xe4)],_0x1c48a3=_0x3a643a[_0x21fd70(0x91)](_0x41aeb9[_0x21fd70(0x137)]*this['_relativePosition']/0xa);this['x']=_0x41aeb9['x']+_0x1c48a3-_0x3cece8[_0x21fd70(0x91)](this[_0x21fd70(0x137)]/0x2),this['x']=this['x']['clamp'](_0x41aeb9['x'],_0x41aeb9['x']+_0x41aeb9[_0x21fd70(0x137)]-this[_0x21fd70(0x137)]);}else{if($gameSwitches[_0x21fd70(0x24a)](_0x46af37))return![];}}return!![];}return!![];},Window_ChoiceList['prototype']['parseChoiceText']=function(_0x522a76){const _0x37826b=_0x43c7f8;let _0x37913f=_0x522a76;return _0x37913f=_0x37913f[_0x37826b(0x235)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x37913f=_0x37913f[_0x37826b(0x235)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x37913f;},Window_ChoiceList[_0x43c7f8(0x21c)][_0x43c7f8(0xa0)]=function(_0x424f1c){const _0x218acb=_0x43c7f8;if(_0x424f1c[_0x218acb(0x30d)](/<DISABLE>/i))return![];if(_0x424f1c['match'](/<ENABLE>/i))return!![];if(_0x424f1c['match'](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('Fepqi'==='Fepqi'){const _0x58874e=JSON['parse']('['+RegExp['$1'][_0x218acb(0x30d)](/\d+/g)+']');for(const _0xa5e752 of _0x58874e){if(!$gameSwitches[_0x218acb(0x24a)](_0xa5e752))return![];}return!![];}else _0x376b86['x']=this[_0x218acb(0x137)]+_0x49af5c;}if(_0x424f1c['match'](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x34a93a=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x78b41b of _0x34a93a){if(_0x218acb(0x166)!==_0x218acb(0x166))this[_0x218acb(0xe8)]=null;else{if(!$gameSwitches[_0x218acb(0x24a)](_0x78b41b))return![];}}return!![];}if(_0x424f1c['match'](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1227c8=JSON[_0x218acb(0x22f)]('['+RegExp['$1'][_0x218acb(0x30d)](/\d+/g)+']');for(const _0x2f4fe8 of _0x1227c8){if($gameSwitches[_0x218acb(0x24a)](_0x2f4fe8))return!![];}return![];}if(_0x424f1c['match'](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x218acb(0x232)===_0x218acb(0x232)){const _0x49a454=JSON[_0x218acb(0x22f)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3d418f of _0x49a454){if(!$gameSwitches[_0x218acb(0x24a)](_0x3d418f))return!![];}return![];}else _0x54cf28[_0x218acb(0x285)](this[_0x218acb(0x1fd)]()),this[_0x218acb(0xe4)][_0x218acb(0x155)](),this[_0x218acb(0xae)]();}if(_0x424f1c[_0x218acb(0x30d)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32ca67=JSON[_0x218acb(0x22f)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3bfd6c of _0x32ca67){if(!$gameSwitches['value'](_0x3bfd6c))return!![];}return![];}if(_0x424f1c[_0x218acb(0x30d)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x218acb(0x28a)==='RMxDT')var _0x18de46=new _0x746c75(_0xc702c5,'i');else{const _0x559dd1=JSON[_0x218acb(0x22f)]('['+RegExp['$1'][_0x218acb(0x30d)](/\d+/g)+']');for(const _0xf3bc26 of _0x559dd1){if($gameSwitches[_0x218acb(0x24a)](_0xf3bc26))return![];}return!![];}}return!![];},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x17b)]=Window_ChoiceList[_0x43c7f8(0x21c)][_0x43c7f8(0xba)],Window_ChoiceList[_0x43c7f8(0x21c)][_0x43c7f8(0xba)]=function(){const _0x29ad75=_0x43c7f8;VisuMZ[_0x29ad75(0x2fa)]['Window_ChoiceList_updatePlacement']['call'](this),this[_0x29ad75(0x264)]();},Window_ChoiceList[_0x43c7f8(0x21c)]['placeCancelButton']=function(){const _0x42a4f3=_0x43c7f8;if(!this['_cancelButton'])return;const _0x529543=0x8,_0x2e643d=this[_0x42a4f3(0x183)],_0x43f174=this['x']+this[_0x42a4f3(0x137)],_0x3e3116=Math[_0x42a4f3(0x91)]((Graphics[_0x42a4f3(0x137)]-Graphics[_0x42a4f3(0x2a2)])/0x2);if(_0x43f174>=Graphics[_0x42a4f3(0x2a2)]+_0x3e3116-_0x2e643d[_0x42a4f3(0x137)]+_0x529543)'pWfUD'!==_0x42a4f3(0x182)?(this[_0x42a4f3(0x95)]=this[_0x42a4f3(0x95)]||[],this[_0x42a4f3(0x189)]['textColor']=this[_0x42a4f3(0x95)][_0x42a4f3(0x286)]()||_0x2c0d95[_0x42a4f3(0x2a9)]()):_0x2e643d['x']=-_0x2e643d['width']-_0x529543;else{if(_0x42a4f3(0xc1)===_0x42a4f3(0x1a4)){_0x1ba9b6['ConvertParams'](_0x350355,_0x496023);const _0x257ef5=_0x2db641[_0x42a4f3(0x17f)]||_0x59c9d4[_0x42a4f3(0x97)]()||0x1,_0x1c8afd=_0x260e7f[_0x42a4f3(0x1a6)]||_0x517f67[_0x42a4f3(0x2f8)]()||0x1;_0x90a68d[_0x42a4f3(0xd7)]=_0x1442f7[_0x42a4f3(0x313)]||![];const _0x31fe81=_0x41d2bb['WordWrap'][_0x42a4f3(0xec)]();_0x53214a['setMessageWindowRows'](_0x257ef5),_0x223b10['setMessageWindowWidth'](_0x1c8afd);[_0x42a4f3(0xb0),'false'][_0x42a4f3(0x123)](_0x31fe81)&&_0x37f6bd[_0x42a4f3(0x2b0)](_0x498bf7(_0x31fe81));const _0x37175d=_0x3d95b2[_0x42a4f3(0x2e5)]['_messageWindow'];_0x37175d&&(_0x37175d['resetWordWrap'](),_0x37175d[_0x42a4f3(0x16d)](),_0x37175d[_0x42a4f3(0x206)]());}else _0x2e643d['x']=this['width']+_0x529543;}_0x2e643d['y']=this['height']/0x2-_0x2e643d[_0x42a4f3(0xb6)]/0x2;},VisuMZ[_0x43c7f8(0x2fa)][_0x43c7f8(0x145)]=Window_ChoiceList['prototype'][_0x43c7f8(0x15c)],Window_ChoiceList['prototype'][_0x43c7f8(0x15c)]=function(){const _0x23f989=_0x43c7f8;return this[_0x23f989(0xe4)]?'uBHav'!==_0x23f989(0x2de)?this[_0x23f989(0x2c8)]():this[_0x23f989(0x2e5)]&&this['_scene'][_0x23f989(0x1af)]===_0x1cc503:VisuMZ[_0x23f989(0x2fa)]['Window_ChoiceList_windowX'][_0x23f989(0x165)](this);},Window_ChoiceList[_0x43c7f8(0x21c)][_0x43c7f8(0x2c8)]=function(){const _0x3f87df=_0x43c7f8,_0x2e4a52=$gameMessage[_0x3f87df(0x1d0)]();if(_0x2e4a52===0x1){if(_0x3f87df(0x1ba)===_0x3f87df(0x1ba))return(Graphics['boxWidth']-this[_0x3f87df(0x9f)]())/0x2;else{if(_0x21d512===_0x3f87df(0x167))return this[_0x3f87df(0x2d3)](_0x22ab0b,_0xd5ef16,_0x12ef18);_0x1e6421['MessageCore'][_0x3f87df(0x297)]['call'](this,_0x105e3f,_0x3d96f5,_0x43aba2);}}else{if(_0x2e4a52===0x2){if('LzNrA'===_0x3f87df(0x2f4))return this[_0x3f87df(0xe4)]['x']+this[_0x3f87df(0xe4)][_0x3f87df(0x137)]-this[_0x3f87df(0x9f)]();else this['contents'][_0x3f87df(0x22d)]+=_0x59c490[_0x3f87df(0x2fa)][_0x3f87df(0x188)]['General']['FontChangeValue'],this[_0x3f87df(0x189)][_0x3f87df(0x22d)]=_0x46453[_0x3f87df(0x17a)](this[_0x3f87df(0x189)][_0x3f87df(0x22d)],_0x1bcfe8['MessageCore'][_0x3f87df(0x188)][_0x3f87df(0x1e5)][_0x3f87df(0x2a6)]);}else{if(_0x3f87df(0x2bd)!==_0x3f87df(0xc3))return this[_0x3f87df(0xe4)]['x'];else{const _0x43e84a=_0x2f60f8[_0x3f87df(0x1a7)]()['map'](_0xa2966a=>this[_0x3f87df(0x308)](_0xa2966a))['filter'](_0xfbe074=>this['isChoiceVisible'](_0xfbe074)),_0x3c9049=_0x42f2b5[_0x3f87df(0x193)](_0x43e84a['length']/this[_0x3f87df(0x2ff)]());return _0x190438[_0x3f87df(0x2a5)](0x1,_0x2ed2b2[_0x3f87df(0x17a)](_0x3c9049,this[_0x3f87df(0x2e3)]()));}}}},Window_ChoiceList[_0x43c7f8(0x21c)]['windowWidth']=function(){const _0x9b24e1=_0x43c7f8,_0x1101b8=(this[_0x9b24e1(0x9c)]()+this[_0x9b24e1(0x1ae)]())*this[_0x9b24e1(0x2ff)]()+this[_0x9b24e1(0x1dd)]*0x2;return Math[_0x9b24e1(0x17a)](_0x1101b8,Graphics['width']);},Window_ChoiceList[_0x43c7f8(0x21c)]['numVisibleRows']=function(){const _0x39895d=_0x43c7f8,_0x20123c=$gameMessage['choices']()[_0x39895d(0x172)](_0x391f7f=>this[_0x39895d(0x308)](_0x391f7f))[_0x39895d(0x128)](_0x2506f8=>this[_0x39895d(0x28d)](_0x2506f8)),_0x44ec72=Math[_0x39895d(0x193)](_0x20123c['length']/this[_0x39895d(0x2ff)]());return Math[_0x39895d(0x2a5)](0x1,Math[_0x39895d(0x17a)](_0x44ec72,this['maxLines']()));},Window_ChoiceList[_0x43c7f8(0x21c)][_0x43c7f8(0x2e3)]=function(){const _0x49d34b=_0x43c7f8,_0x133ab3=this['_messageWindow'],_0x2f3fa9=_0x133ab3?_0x133ab3['y']:0x0,_0x271a90=_0x133ab3?_0x133ab3[_0x49d34b(0xb6)]:0x0,_0xfdbaa9=Graphics['boxHeight']/0x2;if(_0x2f3fa9<_0xfdbaa9&&_0x2f3fa9+_0x271a90>_0xfdbaa9)return 0x4;else{if(_0x49d34b(0x26b)==='UOkWr')return $gameSystem['getChoiceListMaxRows']();else{_0x4ed998=this[_0x49d34b(0x308)](_0x521469);if(this[_0x49d34b(0x28d)](_0x130892)){const _0x5116d3=this[_0x49d34b(0x26d)](_0x22665d),_0x529c00=this[_0x49d34b(0xa0)](_0x79b223);this['addCommand'](_0x5116d3,_0x49d34b(0x17d),_0x529c00,_0x4958ab);}_0x3b4b8a++;}}},Window_ChoiceList[_0x43c7f8(0x21c)][_0x43c7f8(0x9c)]=function(){const _0xd098d5=_0x43c7f8;let _0x26b4e0=0x60;for(const _0x3dd416 of this[_0xd098d5(0x2f0)]){const _0x57f853=_0x3dd416[_0xd098d5(0x140)],_0x5749f9=this[_0xd098d5(0x291)](_0x57f853)[_0xd098d5(0x137)],_0xc56848=Math[_0xd098d5(0x193)](_0x5749f9)+this['itemPadding']()*0x2;_0x26b4e0<_0xc56848&&(_0x26b4e0=_0xc56848);}return _0x26b4e0;},Window_ChoiceList['prototype'][_0x43c7f8(0x1f3)]=function(_0x3ca9f9){const _0x50993e=_0x43c7f8,_0x53f474=this[_0x50993e(0x251)](_0x3ca9f9),_0x236799=$gameSystem[_0x50993e(0x204)]()!==_0x50993e(0x99)?_0x50993e(0x158)[_0x50993e(0xdf)]($gameSystem[_0x50993e(0x204)]()):'',_0x530433=_0x236799+this['commandName'](_0x3ca9f9);this[_0x50993e(0x250)](this[_0x50993e(0x7c)](_0x3ca9f9));const _0x47c724=this[_0x50993e(0x291)](_0x530433)[_0x50993e(0xb6)],_0x4cd3b3=Math[_0x50993e(0x2a5)](_0x53f474['y'],_0x53f474['y']+Math[_0x50993e(0xd4)]((_0x53f474[_0x50993e(0xb6)]-_0x47c724)/0x2));this[_0x50993e(0x105)](_0x530433,_0x53f474['x'],_0x4cd3b3,_0x53f474['width']);},Window_ChoiceList[_0x43c7f8(0x21c)]['callOkHandler']=function(){const _0x1257fc=_0x43c7f8;$gameMessage[_0x1257fc(0x285)](this[_0x1257fc(0x1fd)]()),this[_0x1257fc(0xe4)]['terminateMessage'](),this[_0x1257fc(0xae)]();};