function text = create_symbol_string(filename)
    fid = fopen(filename);
    text = '';
    while 1
        line = fgetl(fid);
        if ~ischar(line)
            break
        end
        text = strcat(text, line);
        text = strcat(text, '\n');
    end
end