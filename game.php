<?php
try {
	$dbh = new PDO('mysql:host=10.66.28.221; port=3306; dbname=x6316047DB', 'x6316047', 'tentacle');
} catch (PDOException $e) {
	var_dump($e->getMessage());
	exit;
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
</head>
<body>
	<?php
		if(isset($_GET['state'])) {
			$state = $_GET['state'];
		} else {
			$state = 0;
		}
	?>
	<canvas id="game" width="600" height="600"></canvas>
	<br>
	<button id="update">Update</button>
	<button id="stop">Stop</button>
	<button id="reset">Reset</button>
	<button id="random">Random</button>
	<hr>
	<h1>Database</h1>
	<table border="1">
		<tr>
			<td>ID</td>
			<td>Name</td>
			<td>Note</td>
		</tr>
		<?php
			function print_table($row) {
				print('<tr>');
				foreach($row as $cell) {
					print('<td>' . $cell . '</td>');
				}
				print('</tr>');
			}	

			$sql = "select id, name, note from logs";
			$stmt = $dbh->query($sql);
			foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $user) {
				print_table($user);
			}
		?>
	</table>
<hr color="#f5f5f5">
		<form id="form" method="POST" action="game.php">
		Name: <input type="text" name=name>
		<br>
		Note: <input type="text" name=note>
		<br>
		<input type="submit" id="add" name="add" value="Add">
<?php
	if(isset($_POST['add'])) {
		$name = $_REQUEST['name'];
		$note = $_REQUEST['note'];
		$data = $_REQUEST['data'];

		if($name && $note && $data) { 
			$stmt = $dbh->prepare("insert into logs (name, note, state) values (:name, :note, :state)");
			$stmt->execute(array(":name"=>$name, ":note"=>$note, ":state"=>$data));
			header("Location: " . $_SERVER['PHP_SELF']);
		}
	}
?>
</form>

<?php
	if(!empty($_POST["data"])){
		echo $_POST["data"];
	}
?>

<hr color="#f5f5f5">
	<form method="POST" action="game.php">
		ID: <select name="selectID">
		<?php	
			function print_id($arr) {
				foreach($arr as $id) {
					print('<option name="id">' . $id . '</option>');
				}
			}

			$sql = "select id from logs";
			$stmt = $dbh->query($sql);
			foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $user) {
				print_id($user);
			}
		?>
		</select>
		<input type="submit" id="get" name="get" value="Get">
		<input type="submit" name="delete" value="Delete">
		<?php
			if(isset($_POST['delete'])) {
				$id = $_REQUEST[selectID];
				
				$stmt = $dbh->prepare("delete from logs where id = :id");
				$stmt->execute(array(":id"=>$id));
				header("Location: " . $_SERVER['PHP_SELF']);
			}

			if(isset($_POST['get'])) {
				$id = $_REQUEST[selectID];
				
				$stmt = $dbh->query("select state from logs where id = " . $id);
				$log = $stmt->fetch();
				$query = http_build_query($log);
				header("Location: " . $_SERVER['PHP_SELF'] . "?" . $query);
			}
		?>
	</form>
	<script type="text/javascript">
		let state = "<?php echo $state ?>";
	</script>
	<script type="text/javascript" src="game.js">
	</script>
</body>
</html>

