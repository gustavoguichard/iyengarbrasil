file_names = Dir[Dir.pwd + "/*.html"]

file_names.each do |file_name|
  text = File.read(file_name)
  new_script = text.gsub('<script src="src/main.bundle.js"', '<script src="js/main.bundle.js"')
  new_contents = new_script.gsub('<!-- <link rel="stylesheet" href="css/main.css"> -->', '<link rel="stylesheet" href="css/main.css">')

  # To write changes to the file, use:
  File.open(file_name, "w") {|file| file.puts new_contents }
end
