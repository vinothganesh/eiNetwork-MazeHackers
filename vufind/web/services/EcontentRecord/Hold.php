<?php
/**
 *
 * Copyright (C) Villanova University 2007.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 */

require_once 'Drivers/EContentDriver.php';

require_once 'Action.php';

class Hold extends Action{
	function launch(){
		global $interface;
		global $configArray;
		global $user;

		$driver = new EContentDriver();
		$id = strip_tags($_REQUEST['id']);
		$interface->assign('id', $id);
		
		$logger = new Logger();
		
		//Get title information for the record.
		$eContentRecord = new EContentRecord();
		$eContentRecord->id = $id;
		if (!$eContentRecord->find(true)){
			PEAR::raiseError("Unable to find eContent record for id: $id");
		}
		
		if (isset($_REQUEST['autologout'])){
			$_SESSION['autologout'] = true;
		}

		if (isset($_POST['submit']) || $user) {
			if (isset($_REQUEST['username']) && isset($_REQUEST['password'])){
				//Log the user in
				$user = UserAccount::login();
			}

			if (!PEAR::isError($user) && $user){
				//The user is already logged in
				$return = $driver->placeHold($id, $user);
				$interface->assign('result', $return['result']);
				$message = $return['message'];
				$interface->assign('message', $message);
				$showMessage = true;
			} else {
				$message = 'Incorrect Patron Information';
				$interface->assign('message', $message);
				$interface->assign('focusElementId', 'username');
				$showMessage = true;
			}
		} else{
			//Get the referrer so we can go back there.
			if (isset($_SERVER['HTTP_REFERER'])){
				$referer = $_SERVER['HTTP_REFERER'];
				$_SESSION['hold_referrer'] = $referer;
			}

			//Showing place hold form.
			if (!PEAR::isError($user) && $user){
				//set focus to the submit button if the user is logged in since the campus will be correct most of the time.
				$interface->assign('focusElementId', 'submit');
			}else{
				//set focus to the username field by default.
				$interface->assign('focusElementId', 'username');
			}

		}
		
		if (isset($return) && $showMessage) {
			$hold_message_data = array(
              'successful' => $return['result'] ? 'all' : 'none',
              'error' => $return['error'],
              'titles' => array(
			$return,
			),
			);

			$_SESSION['hold_message'] = $hold_message_data;
			if (isset($_SESSION['hold_referrer'])){
				$logger->log('Hold Referrer is set, redirecting to there.  type = ' . $_REQUEST['type'], PEAR_LOG_INFO);

				header("Location: " . $_SESSION['hold_referrer']);
				unset($_SESSION['hold_referrer']);
				if (isset($_SESSION['autologout'])){
					unset($_SESSION['autologout']);
					UserAccount::softLogout();
				}
				
			}else{
				$logger->log('No referrer set, but there is a message to show, go to the main holds page', PEAR_LOG_INFO);
				header("Location: " . $configArray['Site']['url'] . '/MyResearch/MyEContent');
			}
		} else {
			$logger->log('placeHold finished, do not need to show a message', PEAR_LOG_INFO);
			$interface->setPageTitle('Request an Item');
			$interface->assign('subTemplate', 'hold.tpl');
			$interface->setTemplate('hold.tpl');
			$interface->display('layout.tpl', 'RecordHold' . $_GET['id']);
		}
	}

}