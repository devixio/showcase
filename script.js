document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Interactive Terminal
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const input = document.getElementById('command-input');

    if (terminal && output && input) {
        const commandHistory = [];
        let historyIndex = -1;
        let matrixInterval = null;
        const isArabic = document.documentElement.lang === 'ar';
        let currentDir = '~';

        const commands = {
            help: () => isArabic ? `<span class="output-text"><span class="cmd">═══════════════════════════════════════</span></span>
<span class="output-text"><span class="cmd">           أوامر الطرفية</span></span>
<span class="output-text"><span class="cmd">═══════════════════════════════════════</span></span>
<span class="output-text"></span>
<span class="output-text"><span class="cmd">  التنقل:</span></span>
<span class="output-text">    cd [dir]      - تغيير المجلد</span>
<span class="output-text">    ls            - قائمة الملفات</span>
<span class="output-text">    pwd           - المسار الحالي</span>
<span class="output-text">    tree          - شجرة المجلدات</span>
<span class="output-text"></span>
<span class="output-text"><span class="cmd">  النظام:</span></span>
<span class="output-text">    whoami        - المستخدم الحالي</span>
<span class="output-text">    uname         - معلومات النظام</span>
<span class="output-text">    uptime        - وقت التشغيل</span>
<span class="output-text">    df            - مساحة القرص</span>
<span class="output-text">    free          - الذاكرة المتاحة</span>
<span class="output-text">    top           - العمليات الجارية</span>
<span class="output-text">    htop          - عرض العمليات</span>
<span class="output-text">    cal           - التقويم</span>
<span class="output-text">    date          - التاريخ الحالي</span>
<span class="output-text"></span>
<span class="output-text"><span class="cmd">  الملفات:</span></span>
<span class="output-text">    cat [file]    - قراءة ملف</span>
<span class="output-text">    echo [text]   - طباعة نص</span>
<span class="output-text">    alias         - الأسماء المختصرة</span>
<span class="output-text">    which [cmd]   - موقع الأمر</span>
<span class="output-text">    type [cmd]    - نوع الأمر</span>
<span class="output-text"></span>
<span class="output-text"><span class="cmd">  الشبكة:</span></span>
<span class="output-text">    ping [host]   - اختبار الاتصال</span>
<span class="output-text">    socials       - الروابط الاجتماعية</span>
<span class="output-text"></span>
<span class="output-text"><span class="cmd">  المرح:</span></span>
<span class="output-text">    role          - الأدوار الحالية</span>
<span class="output-text">    theme         - السمة الحالية</span>
<span class="output-text">    fortune       - حكمة عشوائية</span>
<span class="output-text">    cowsay [text] - بقرة تتحدث</span>
<span class="output-text">    figlet [text] - نص كبير</span>
<span class="output-text">    cmatrix       - تأثير الماتريكس</span>
<span class="output-text">    cava          - مرئي الصوت</span>
<span class="output-text">    sl            - قطار</span>
<span class="output-text"></span>
<span class="output-text"><span class="cmd">  الأنظمة:</span></span>
<span class="output-text">    sudo [cmd]    - تنفيذ بأذونات أعلى</span>
<span class="output-text">    clear         - مسح الطرفية</span>
<span class="output-text">    history       - سجل الأوامر</span>
<span class="output-text">    exit          - خروج</span>
<span class="output-text"><span class="cmd">═══════════════════════════════════════</span></span>` :
`<span class="output-text"><span class="cmd">═══════════════════════════════════════</span></span>
<span class="output-text"><span class="cmd">           TERMINAL COMMANDS</span></span>
<span class="output-text"><span class="cmd">═══════════════════════════════════════</span></span>
<span class="output-text"></span>
<span class="output-text"><span class="cmd">  Navigation:</span></span>
<span class="output-text">    cd [dir]      - Change directory</span>
<span class="output-text">    ls            - List files</span>
<span class="output-text">    pwd           - Print working directory</span>
<span class="output-text">    tree          - Directory tree</span>
<span class="output-text"></span>
<span class="output-text"><span class="cmd">  System:</span></span>
<span class="output-text">    whoami        - Current user</span>
<span class="output-text">    uname         - System information</span>
<span class="output-text">    uptime        - System uptime</span>
<span class="output-text">    df            - Disk usage</span>
<span class="output-text">    free          - Memory usage</span>
<span class="output-text">    top           - Running processes</span>
<span class="output-text">    htop          - Process viewer</span>
<span class="output-text">    cal           - Calendar</span>
<span class="output-text">    date          - Current date/time</span>
<span class="output-text"></span>
<span class="output-text"><span class="cmd">  Files:</span></span>
<span class="output-text">    cat [file]    - Read file contents</span>
<span class="output-text">    echo [text]   - Print text</span>
<span class="output-text">    alias         - Show aliases</span>
<span class="output-text">    which [cmd]   - Show command path</span>
<span class="output-text">    type [cmd]    - Show command type</span>
<span class="output-text"></span>
<span class="output-text"><span class="cmd">  Network:</span></span>
<span class="output-text">    ping [host]   - Test connectivity</span>
<span class="output-text">    socials       - Show social links</span>
<span class="output-text"></span>
<span class="output-text"><span class="cmd">  Fun:</span></span>
<span class="output-text">    role          - Show current roles</span>
<span class="output-text">    theme         - Show current theme</span>
<span class="output-text">    fortune       - Random wisdom</span>
<span class="output-text">    cowsay [text] - Cow says your text</span>
<span class="output-text">    figlet [text] - Big ASCII text</span>
<span class="output-text">    cmatrix       - Matrix rain effect</span>
<span class="output-text">    cava          - Audio visualizer</span>
<span class="output-text">    sl            - Steam locomotive</span>
<span class="output-text"></span>
<span class="output-text"><span class="cmd">  System:</span></span>
<span class="output-text">    sudo [cmd]    - Execute with elevated privileges</span>
<span class="output-text">    clear         - Clear terminal</span>
<span class="output-text">    history       - Command history</span>
<span class="output-text">    exit          - Exit terminal</span>
<span class="output-text"><span class="cmd">═══════════════════════════════════════</span></span>`,

            whoami: () => `<span class="output-text">devix</span>`,

            role: () => isArabic ? `<span class="output-text">عاشق لينكس · لاعب محترف · يوتيوبر</span>` : `<span class="output-text">Linux Enthusiast · Pro Gamer · Youtuber</span>`,

            ls: () => {
                const cwd = currentDir || '~';
                if (cwd === '~' || cwd === '/home/devix') {
                    return `<span class="output-text"><span class="dir">scripts/</span>  <span class="dir">dotfiles/</span>  <span class="dir">tools/</span>  <span class="dir">projects/</span>  <span class="dir">downloads/</span>  <span class="dir">pictures/</span></span>`;
                } else if (cwd.includes('scripts')) {
                    return `<span class="output-text"><span class="file">setup.sh</span>  <span class="file">update.sh</span>  <span class="file">backup.sh</span>  <span class="file">clean.sh</span></span>`;
                } else if (cwd.includes('dotfiles')) {
                    return `<span class="output-text"><span class="dir">alacritty/</span>  <span class="dir">fish/</span>  <span class="dir">gtk-3.0/</span>  <span class="dir">hypr/</span>  <span class="dir">wofi/</span></span>`;
                } else if (cwd.includes('tools')) {
                    return `<span class="output-text"><span class="file">neovim/</span>  <span class="file">tmux.conf</span>  <span class="file">.gitconfig</span></span>`;
                }
                return `<span class="output-text"><span class="dir">scripts/</span>  <span class="dir">dotfiles/</span>  <span class="dir">tools/</span>  <span class="dir">projects/</span></span>`;
            },

            'cat role.txt': () => isArabic ? `<span class="output-text">عاشق لينكس · لاعب محترف · يوتيوبر</span>` : `<span class="output-text">Linux Enthusiast · Pro Gamer · Youtuber</span>`,

            'cat about.txt': () => isArabic ? `<span class="output-text">مرحباً! أنا ديفيكس - عاشق لينكس، لاعب محترف، ويوتيوبر.</span>
<span class="output-text">أحب إنشاء الأدوات، تخصيص إعداداتي، ومشاركة المحتوى.</span>` :
`<span class="output-text">Hey! I'm devix - a Linux enthusiast, pro gamer, and YouTuber.</span>
<span class="output-text">I love creating tools, customizing my setup, and sharing content.</span>`,

            pwd: () => {
                const path = currentDir === '~' ? '/home/devix' : `/home/devix/${currentDir.replace('~/', '')}`;
                return `<span class="output-text">${path}</span>`;
            },

            cd: (dir) => {
                const target = dir || '~';
                if (target === '~' || target === '/home/devix') {
                    currentDir = '~';
                    return null;
                } else if (target === '..') {
                    if (currentDir !== '~') {
                        const parts = currentDir.split('/');
                        parts.pop();
                        currentDir = parts.join('/') || '~';
                    }
                    return null;
                } else if (target === 'scripts' || target === 'scripts/') {
                    currentDir = 'scripts';
                    return null;
                } else if (target === 'dotfiles' || target === 'dotfiles/') {
                    currentDir = 'dotfiles';
                    return null;
                } else if (target === 'tools' || target === 'tools/') {
                    currentDir = 'tools';
                    return null;
                } else if (target === 'projects' || target === 'projects/') {
                    currentDir = 'projects';
                    return null;
                } else {
                    return `<span class="error">cd: ${escapeHtml(target)}: No such file or directory</span>`;
                }
            },

            socials: () => isArabic ? `<span class="output-text"><span class="cmd">GitHub:</span>   https://github.com/devixio</span>
<span class="output-text"><span class="cmd">YouTube:</span>  https://www.youtube.com/@imdevix</span>
<span class="output-text"><span class="cmd">Discord:</span>  https://discord.gg/p2QzaUtWvS</span>
<span class="output-text"><span class="cmd">البريد:</span>   devix.io@proton.me</span>` :
`<span class="output-text"><span class="cmd">GitHub:</span>   https://github.com/devixio</span>
<span class="output-text"><span class="cmd">YouTube:</span>  https://www.youtube.com/@imdevix</span>
<span class="output-text"><span class="cmd">Discord:</span>  https://discord.gg/p2QzaUtWvS</span>
<span class="output-text"><span class="cmd">Email:</span>    devix.io@proton.me</span>`,

            theme: () => `<span class="output-text"><span class="theme-name">Catppuccin Mocha</span></span>
<span class="output-text">Base:      #1E1E2E</span>
<span class="output-text">Mantle:    #181825</span>
<span class="output-text">Surface0:  #313244</span>
<span class="output-text">Text:      #CDD6F4</span>
<span class="output-text">Blue:      #89B4FA</span>
<span class="output-text">Mauve:     #CBA6F7</span>
<span class="output-text">Green:     #A6E3A1</span>`,

            uname: () => `<span class="output-text">Linux devix-arch 6.10-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux</span>`,

            uptime: () => {
                const hours = Math.floor(Math.random() * 24);
                const mins = Math.floor(Math.random() * 60);
                return `<span class="output-text"> ${new Date().toLocaleTimeString()} up ${hours}:${mins.toString().padStart(2, '0')}, 1 user, load average: 0.${Math.floor(Math.random() * 50)}, 0.${Math.floor(Math.random() * 30)}, 0.${Math.floor(Math.random() * 20)}</span>`;
            },

            cal: () => {
                const now = new Date();
                const month = now.toLocaleString('en', { month: 'long' });
                const year = now.getFullYear();
                const today = now.getDate();
                const firstDay = new Date(year, now.getMonth(), 1).getDay();
                const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();

                let cal = `<span class="output-text">     ${month} ${year}</span>\n`;
                cal += `<span class="output-text">Su Mo Tu We Th Fr Sa</span>\n`;
                let line = '   '.repeat(firstDay);
                for (let d = 1; d <= daysInMonth; d++) {
                    const dayStr = d === today ? `<span class="cmd">${d.toString().padStart(2)}</span>` : d.toString().padStart(2);
                    line += dayStr + ' ';
                    if ((firstDay + d) % 7 === 0) {
                        cal += `<span class="output-text">${line}</span>\n`;
                        line = '';
                    }
                }
                if (line) cal += `<span class="output-text">${line}</span>`;
                return cal;
            },

            df: () => `<span class="output-text">Filesystem      Size  Used Avail Use% Mounted on</span>
<span class="output-text">/dev/nvme0n1p2  500G  180G  320G  36% /</span>
<span class="output-text">/dev/nvme0n1p1  512M   64M  448M  13% /boot</span>
<span class="output-text">tmpfs            16G     0   16G   0% /tmp</span>`,

            free: () => `<span class="output-text">              total        used        free      shared  buff/cache   available</span>
<span class="output-text">Mem:          32Gi       12Gi        8Gi       512Mi       12Gi       19Gi</span>
<span class="output-text">Swap:          8Gi         0B        8Gi</span>`,

            top: () => `<span class="output-text"><span class="cmd">PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND</span></span>
<span class="output-text"> 1001 devix     20   0  12.5g  2.1g  145m S  12.3   6.8   2:34.56 hyprland</span>
<span class="output-text"> 1042 devix     20   0  892m   85m   42m S   8.7   0.3   1:23.45 alacritty</span>
<span class="output-text"> 1089 devix     20   0  2.1g  340m  128m S   5.4   1.1   0:56.78 discord</span>
<span class="output-text"> 1156 devix     20   0  1.8g  280m   98m S   3.2   0.9   0:45.12 firefox</span>
<span class="output-text">    1 root      20   0  168m   12m   8m  S   0.3   0.0   0:05.67 systemd</span>`,

            htop: () => `<span class="output-text"><span class="cmd">  PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command</span></span>
<span class="output-text"> 1001 devix      20   0  12G  2.1G  145M S 12.3  6.8   2:34  ├─ hyprland</span>
<span class="output-text"> 1042 devix      20   0  892M  85M  42M  S  8.7  0.3   1:23  ├─ alacritty</span>
<span class="output-text"> 1089 devix      20   0  2.1G 340M  128M S  5.4  1.1   0:56  ├─ discord</span>
<span class="output-text"> 1156 devix      20   0  1.8G 280M   98M S  3.2  0.9   0:45  ├─ firefox</span>
<span class="output-text">  [))))))))))))))))))))))))))))))))-------  45.2%</span>
<span class="output-text">  Mem[||||||||||||||||--------        12.3G/32G]</span>
<span class="output-text">  Swp[                            0B/8G]</span>`,

            tree: () => `<span class="output-text"><span class="dir">.</span></span>
<span class="output-text">├── <span class="dir">alacritty/</span></span>
<span class="output-text">│   └── alacritty.toml</span>
<span class="output-text">├── <span class="dir">fish/</span></span>
<span class="output-text">│   └── config.fish</span>
<span class="output-text">├── <span class="dir">gtk-3.0/</span></span>
<span class="output-text">│   ├── settings.ini</span>
<span class="output-text">│   └── gtk.css</span>
<span class="output-text">├── <span class="dir">hypr/</span></span>
<span class="output-text">│   └── hyprland.lua</span>
<span class="output-text">├── <span class="dir">qt5ct/</span></span>
<span class="output-text">├── <span class="dir">qt6ct/</span></span>
<span class="output-text">├── <span class="dir">Thunar/</span></span>
<span class="output-text">├── <span class="dir">wofi/</span></span>
<span class="output-text">│   ├── config</span>
<span class="output-text">│   └── style.css</span>
<span class="output-text">└── <span class="dir">xfce4/</span></span>`,

            alias: () => `<span class="output-text"><span class="cmd">alias</span> update='sudo pacman -Syu'</span>
<span class="output-text"><span class="cmd">alias</span> ll='ls -la --color=auto'</span>
<span class="output-text"><span class="cmd">alias</span> gs='git status'</span>
<span class="output-text"><span class="cmd">alias</span> gp='git push'</span>
<span class="output-text"><span class="cmd">alias</span> gc='git commit -m'</span>
<span class="output-text"><span class="cmd">alias</span> cls='clear'</span>
<span class="output-text"><span class="cmd">alias</span> ..='cd ..'</span>
<span class="output-text"><span class="cmd">alias</span> ...='cd ../..'</span>`,

            history: () => {
                if (commandHistory.length === 0) return `<span class="output-text">No commands in history.</span>`;
                return commandHistory.slice(0, 20).map((cmd, i) =>
                    `<span class="output-text">${(commandHistory.length - i).toString().padStart(4)}  ${escapeHtml(cmd)}</span>`
                ).join('\n');
            },

            fortune: () => {
                const fortunes = isArabic ? [
                    `"النجاح ليس نهائياً والفشل ليس قاتلاً: الشجاعة للاستمرار هي ما يهم." - وينستون تشرشل`,
                    `"الطريق إلى النجاح يمر عبر الفشل."`,
                    `"لا تضع كل البيض في سلة واحدة."`,
                    `"العلم نور والجهل ظلام."`,
                    `"ابدأ من حيث أنت وما عندك هو ما تحتاجه."`,
                    `"ال İşte Requires lids=require('lids'); // doesn't work, need to use require with extension`
                ] : [
                    `"Success is not final, failure is not fatal: the courage to continue is what counts." - Winston Churchill`,
                    `"The only way to do great work is to love what you do." - Steve Jobs`,
                    `"Talk is cheap. Show me the code." - Linus Torvalds`,
                    `"First, solve the problem. Then, write the code." - John Johnson`,
                    `"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler`,
                    `"It works on my machine." - Every developer ever`,
                    `"There are only 10 types of people: those who understand binary and those who don't."`
                ];
                return `<span class="output-text">${fortunes[Math.floor(Math.random() * fortunes.length)]}</span>`;
            },

            cowsay: (text) => {
                const msg = text || (isArabic ? 'مرحباً! أنا ديفيكس!' : 'Hello! I am devix!');
                const len = msg.length;
                const top = ' ' + '_'.repeat(len + 2);
                const bottom = ' ' + '-'.repeat(len + 2);
                return `<span class="output-text">${top}</span>
<span class="output-text">&lt; ${escapeHtml(msg)} &gt;</span>
<span class="output-text">${bottom}</span>
<span class="output-text">        \\   ^__^</span>
<span class="output-text">         \\  (oo)\\_______</span>
<span class="output-text">            (__)\\       )\\/\\</span>
<span class="output-text">                ||----w |</span>
<span class="output-text">                ||     ||</span>`;
            },

            figlet: (text) => {
                const msg = text || (isArabic ? 'ديفيكس' : 'devix');
                return `<span class="output-text figlet"> ███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗</span>
<span class="output-text figlet"> ████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝</span>
<span class="output-text figlet"> ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗</span>
<span class="output-text figlet"> ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║</span>
<span class="output-text figlet"> ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║</span>
<span class="output-text figlet"> ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝</span>`;
            },

            cmatrix: () => 'CMATRIX',

            cava: () => 'CAVA',

            sl: () => `<span class="output-text">                         (@@) (  ) (@)  ( )  @@    ()    @@     O    @()     O    @      O</span>
<span class="output-text">                 (    @@  O   (@@)(@)  @@   O@    @@    @@   (@)  (@@)    O@    @@    @@  O</span>
<span class="output-text">              ,===,O,(@)  ,==, O, @O @@  O@   @O   (@@)  O   O,  (@@)   O @  ,=,  ,===, O,</span>
<span class="output-text">             ((@))  O   /  /O  (@) @O  O @@ O@    @O  (@)  O   /  /O  O@  (@) /  / ((@))  O</span>
<span class="output-text">             (@)O   /  /  /O  (@) @O  O @@ O@    @O  (@)  O   /  /  /O  (@) /  /  (@)O   /</span>
<span class="output-text">             O  O  /  /  /O  (@) O   O @@ O@    @O  O   O   /  /  /O  O  /  /   O  O  /</span>
<span class="output-text">              @@  /  /  /  (@)  O    O@@ O@    @O    O  /  /  /  /   @@  /  /    @@  /</span>
<span class="output-text">             /@@@/  /  / O     O     @O @O    @O     O /  /  /  O   /@@@/     /@@@/</span>
<span class="output-text">             |  |__/  /__O  ________O @ O  ____  O __/__  \__O  |__|  |</span>
<span class="output-text">             |  |  |  |  | /        \\\\/ / /    \\/ / \\  |  |  | |  |  |</span>
<span class="output-text">             |  |  |__|  |/    O     \\| |   O    |   \\ |__|  | |__|  |</span>
<span class="output-text">             |  |   __   |    @@@    | |  @@@   |    |   __  |  __   |</span>
<span class="output-text">             |  |  |  |  |           | |        |    |  |  | | |  |  |</span>
<span class="output-text">             |  |  |__|  |  O    O   | |  O   O |    |__|  | | |__|  |</span>
<span class="output-text">             |  |   __   |  @@@@  /  | |  \\@  / |    |   __ |  __   |</span>
<span class="output-text">             |  |  |  |  |        /   | |   \\/  |    |  |  || |  |  |</span>
<span class="output-text">             |  |  |__|  |  O    O   | |  O   O |    |__|  || |__|  |</span>
<span class="output-text">             |  |   __   |  @@@@  /  | |  \\@  / |    |   __ |  __   |</span>
<span class="output-text">             |  |  |  |  |        /   | |   \\/  |    |  |  || |  |  |</span>
<span class="output-text">             |  |  |__|  |  O    O   | |  O   O |    |__|  || |__|  |</span>
<span class="output-text">             |__|   __   |  @@@@  /  | |  \\@  / |    |   __ |  __   |</span>
<span class="output-text">              _   |  |  |        /   | |   \\/  |    |  |  | | |  |  _</span>
<span class="output-text">             / /  |__|  |  O    O   | |  O   O |    |__|  | | |__| / /</span>
<span class="output-text">            / /    __   |  @@@@  /  | |  \\@  / |    |   __ |  __  / /</span>
<span class="output-text">           / /    |  |  |        /   | |   \\/  |    |  |  | | |  / /</span>
<span class="output-text">          / /     |__|  |  O    O   | |  O   O |    |__|  | | | / /</span>
<span class="output-text">         / /       __   |  @@@@  /  | |  \\@  / |    |   __ | |/ /</span>
<span class="output-text">        /_/       |  |  |        /   | |   \\/  |    |  |  | | /_/</span>
<span class="output-text">                  |__|  |________/   |________|    |__|  | |__|</span>
<span class="output-text">                                         CHOO CHOO!</span>`,

            ping: (host) => {
                const target = host || 'github.com';
                const times = Array.from({length: 4}, () => (Math.random() * 50 + 10).toFixed(1));
                const avg = (times.reduce((a, b) => a + parseFloat(b), 0) / times.length).toFixed(1);
                return `<span class="output-text">PING ${escapeHtml(target)} (${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}) 56(84) bytes of data.</span>
${times.map(t => `<span class="output-text">64 bytes from ${escapeHtml(target)}: icmp_seq=1 ttl=56 time=${t} ms</span>`).join('\n')}
<span class="output-text">--- ${escapeHtml(target)} ping statistics ---</span>
<span class="output-text">4 packets transmitted, 4 received, 0% packet loss, time 3004ms</span>
<span class="output-text">rtt min/avg/max/mdev = ${Math.min(...times)}/${avg}/${Math.max(...times)}/${(Math.random() * 5).toFixed(1)} ms</span>`;
            },

            which: (cmd) => {
                const paths = {
                    'ls': '/usr/bin/ls',
                    'cat': '/usr/bin/cat',
                    'grep': '/usr/bin/grep',
                    'echo': '/usr/bin/echo',
                    'pwd': '/usr/bin/pwd',
                    'clear': '/usr/bin/clear',
                    'python': '/usr/bin/python',
                    'node': '/usr/bin/node',
                    'git': '/usr/bin/git',
                    'vim': '/usr/bin/vim',
                    'nvim': '/usr/bin/nvim',
                    'fish': '/usr/bin/fish',
                    'bash': '/usr/bin/bash',
                    'hyprland': '/usr/bin/Hyprland',
                    'alacritty': '/usr/bin/alacritty',
                    'wofi': '/usr/bin/wofi'
                };
                const target = cmd || 'ls';
                return paths[target] ? `<span class="output-text">${paths[target]}</span>` :
                    `<span class="error">${escapeHtml(target)} not found</span>`;
            },

            type: (cmd) => {
                const builtins = ['cd', 'echo', 'export', 'alias', 'source', 'set', 'unset', 'type', 'hash', 'builtin'];
                const target = cmd || 'echo';
                if (builtins.includes(target)) return `<span class="output-text">${escapeHtml(target)} is a shell builtin</span>`;
                if (commands[target]) return `<span class="output-text">${escapeHtml(target)} is a function</span>`;
                return `<span class="output-text">${escapeHtml(target)} is /usr/bin/${escapeHtml(target)}</span>`;
            },

            sudo: (cmd) => {
                if (!cmd) return `<span class="error">usage: sudo [command]</span>`;
                if (cmd === 'rm -rf /') return `<span class="error">Nice try! This is a website, not your actual system.</span>`;
                if (cmd.includes('rm -rf')) return `<span class="error">Permission denied: Nice try though!</span>`;
                return `<span class="output-text">[sudo] password for devix: ********</span>
<span class="output-text">Executing: ${escapeHtml(cmd)}</span>`;
            },

            exit: () => {
                return isArabic ?
                    `<span class="output-text">وداعاً! شكراً لزيارتك.</span>
<span class="output-text">依法 na5odh rassek w rm -rf / *</span>` :
                    `<span class="output-text">Goodbye! Thanks for visiting.</span>
<span class="output-text">Remember: rm -rf / is always an option (just kidding, don't do it).</span>`;
            },

            clear: () => 'CLEAR'
        };

        function processCommand(cmd) {
            const trimmedCmd = cmd.trim().toLowerCase();

            // Add command to output
            const cmdLine = document.createElement('div');
            cmdLine.className = 'terminal-line';
            const promptText = isArabic ? 'سمكة >' : 'fih >';
            cmdLine.innerHTML = `<span class="prompt">${promptText}</span> ${escapeHtml(cmd)}`;
            output.appendChild(cmdLine);

            if (trimmedCmd === '') return;

            commandHistory.unshift(trimmedCmd);
            historyIndex = -1;

            // Stop any running animations
            if (matrixInterval) {
                clearInterval(matrixInterval);
                matrixInterval = null;
            }

            // Check for cmatrix
            if (trimmedCmd === 'cmatrix') {
                startCmatrix();
                return;
            }

            // Check for cava
            if (trimmedCmd === 'cava') {
                startCava();
                return;
            }

            // Check for echo command
            if (trimmedCmd.startsWith('echo ')) {
                const text = cmd.trim().substring(5);
                const outLine = document.createElement('div');
                outLine.className = 'terminal-output';
                outLine.innerHTML = `<span class="output-text">${escapeHtml(text)}</span>`;
                output.appendChild(outLine);
            }
            // Check for cowsay with text
            else if (trimmedCmd.startsWith('cowsay ')) {
                const text = cmd.trim().substring(7);
                const outLine = document.createElement('div');
                outLine.className = 'terminal-output';
                outLine.innerHTML = commands.cowsay(text);
                output.appendChild(outLine);
            }
            // Check for figlet with text
            else if (trimmedCmd.startsWith('figlet ')) {
                const text = cmd.trim().substring(7);
                const outLine = document.createElement('div');
                outLine.className = 'terminal-output';
                outLine.innerHTML = commands.figlet(text);
                output.appendChild(outLine);
            }
            // Check for ping with host
            else if (trimmedCmd.startsWith('ping ')) {
                const host = cmd.trim().substring(5);
                const outLine = document.createElement('div');
                outLine.className = 'terminal-output';
                outLine.innerHTML = commands.ping(host);
                output.appendChild(outLine);
            }
            // Check for which with command
            else if (trimmedCmd.startsWith('which ')) {
                const cmdName = cmd.trim().substring(6);
                const outLine = document.createElement('div');
                outLine.className = 'terminal-output';
                outLine.innerHTML = commands.which(cmdName);
                output.appendChild(outLine);
            }
            // Check for type with command
            else if (trimmedCmd.startsWith('type ')) {
                const cmdName = cmd.trim().substring(5);
                const outLine = document.createElement('div');
                outLine.className = 'terminal-output';
                outLine.innerHTML = commands.type(cmdName);
                output.appendChild(outLine);
            }
            // Check for exact match
            else if (commands[trimmedCmd]) {
                const result = commands[trimmedCmd]();
                if (result === 'CLEAR') {
                    output.innerHTML = '';
                } else {
                    const outLine = document.createElement('div');
                    outLine.className = 'terminal-output';
                    outLine.innerHTML = result;
                    output.appendChild(outLine);
                }
            }
            // Check for cat command with argument
            else if (trimmedCmd.startsWith('cat ')) {
                const file = trimmedCmd.substring(4);
                const catKey = `cat ${file}`;
                if (commands[catKey]) {
                    const outLine = document.createElement('div');
                    outLine.className = 'terminal-output';
                    outLine.innerHTML = commands[catKey]();
                    output.appendChild(outLine);
                } else {
                    const outLine = document.createElement('div');
                    outLine.className = 'terminal-output';
                    outLine.innerHTML = `<span class="error">cat: ${escapeHtml(file)}: No such file or directory</span>`;
                    output.appendChild(outLine);
                }
            }
            // Unknown command
            else {
                const outLine = document.createElement('div');
                outLine.className = 'terminal-output';
                outLine.innerHTML = isArabic ?
                    `<span class="error">bash: ${escapeHtml(trimmedCmd)}: الأمر غير موجود</span>
<span class="output-text">اكتب '<span class="cmd">help</span>' للأوامر المتاحة.</span>` :
                    `<span class="error">bash: ${escapeHtml(trimmedCmd)}: command not found</span>
<span class="output-text">Type '<span class="cmd">help</span>' for available commands.</span>`;
                output.appendChild(outLine);
            }

            // Scroll to bottom
            terminal.scrollTop = terminal.scrollHeight;
        }

        function startCmatrix() {
            const matrixContainer = document.createElement('div');
            matrixContainer.className = 'matrix-container';
            output.appendChild(matrixContainer);

            const chars = 'ア イ ウ エ オ カ キ ク ケ コ サ シ ス セ ソ タ チ ツ テ ト ナ ニ ヌ ネ ノ ハ ヒ フ ヘ ホ マ ミ ム メ モ ヤ ユ ヨ ラ リ ル レ ロ ワ ヰ ヱ ヲ ン 0 1 2 3 4 5 6 7 8 9';
            const charArray = chars.split(' ');

            function createRainDrop() {
                const drop = document.createElement('span');
                drop.className = 'matrix-char';
                drop.textContent = charArray[Math.floor(Math.random() * charArray.length)];
                drop.style.left = Math.random() * 100 + '%';
                drop.style.animationDuration = (Math.random() * 2 + 1) + 's';
                drop.style.opacity = Math.random() * 0.5 + 0.5;
                matrixContainer.appendChild(drop);

                setTimeout(() => drop.remove(), 3000);
            }

            matrixInterval = setInterval(createRainDrop, 50);

            // Add exit instruction
            const exitMsg = document.createElement('div');
            exitMsg.className = 'terminal-output matrix-exit';
            exitMsg.innerHTML = `<span class="output-text">Press Enter or type any command to exit...</span>`;
            output.appendChild(exitMsg);

            terminal.scrollTop = terminal.scrollHeight;
        }

        function startCava() {
            const cavaContainer = document.createElement('div');
            cavaContainer.className = 'cava-container';
            output.appendChild(cavaContainer);

            const barCount = 32;
            const bars = [];

            for (let i = 0; i < barCount; i++) {
                const bar = document.createElement('div');
                bar.className = 'cava-bar';
                cavaContainer.appendChild(bar);
                bars.push(bar);
            }

            function animate() {
                bars.forEach(bar => {
                    const height = Math.random() * 80 + 10;
                    bar.style.height = height + '%';

                    // Color based on height
                    if (height > 70) {
                        bar.style.background = 'var(--red)';
                    } else if (height > 50) {
                        bar.style.background = 'var(--yellow)';
                    } else if (height > 30) {
                        bar.style.background = 'var(--green)';
                    } else {
                        bar.style.background = 'var(--blue)';
                    }
                });
            }

            matrixInterval = setInterval(animate, 100);

            // Add exit instruction
            const exitMsg = document.createElement('div');
            exitMsg.className = 'terminal-output cava-exit';
            exitMsg.innerHTML = `<span class="output-text">Press Enter or type any command to exit...</span>`;
            output.appendChild(exitMsg);

            terminal.scrollTop = terminal.scrollHeight;
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = input.value;
                input.value = '';
                processCommand(cmd);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    input.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    input.value = commandHistory[historyIndex];
                } else {
                    historyIndex = -1;
                    input.value = '';
                }
            } else if (e.key === 'l' && e.ctrlKey) {
                e.preventDefault();
                output.innerHTML = '';
            }
        });

        // Focus input when clicking terminal
        terminal.addEventListener('click', () => input.focus());

        // Welcome message
        const welcome = document.createElement('div');
        welcome.className = 'terminal-output';
        welcome.innerHTML = isArabic ?
            `<span class="output-text"><span class="welcome">مرحباً بك في طرفية ديفيكس!</span></span>
<span class="output-text">اكتب '<span class="cmd">help</span>' للأوامر المتاحة.</span>` :
            `<span class="output-text"><span class="welcome">Welcome to devix's terminal!</span></span>
<span class="output-text">Type '<span class="cmd">help</span>' for available commands.</span>`;
        output.appendChild(welcome);
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.dotfile-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(17, 17, 27, 0.95)';
        } else {
            navbar.style.background = 'rgba(17, 17, 27, 0.85)';
        }
    });

    // Security: Sanitize external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Security: Disable right-click context menu
    document.addEventListener('contextmenu', e => e.preventDefault());

    // Security: Disable keyboard shortcuts for dev tools
    document.addEventListener('keydown', e => {
        // Disable F12
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+U (view source)
        if (e.ctrlKey && e.key === 'U') {
            e.preventDefault();
            return false;
        }
    });

    // Security: Prevent drag and drop of page
    document.addEventListener('dragstart', e => e.preventDefault());

    // Security: Disable text selection on sensitive elements
    document.addEventListener('selectstart', e => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return true;
        }
        return false;
    });

    // Security: Warn in console about tampering
    console.clear();
    console.log('%c Security Notice', 'color: #f38ba8; font-size: 16px; font-weight: bold;');
    console.log('%cThis is a portfolio site. Inspecting code won\'t give you superpowers.', 'color: #a6adc8;');
    console.log('%cIf you found a vulnerability, please report it to devix.io@proton.me', 'color: #a6e3a1;');

    // Discord Widget
    const discordWidget = document.getElementById('discord-widget');
    if (discordWidget) {
        const guildId = 'p2QzaUtWvS';
        fetch(`https://discord.com/api/guilds/${guildId}/widget.json`)
            .then(res => res.json())
            .then(data => {
                const onlineEl = document.getElementById('discord-online');
                const membersEl = document.getElementById('discord-members');
                const listEl = document.getElementById('discord-members-list');

                if (onlineEl) onlineEl.textContent = data.presence_count || '0';
                if (membersEl) membersEl.textContent = data.members ? data.members.length : '0';

                if (listEl && data.members) {
                    listEl.innerHTML = data.members.slice(0, 12).map(m => `
                        <div class="discord-member">
                            <img class="discord-member-avatar" src="${m.avatar_url || 'https://cdn.discordapp.com/embed/avatars/0.png'}" alt="">
                            <span class="discord-member-status ${m.status}"></span>
                            <span>${escapeHtml(m.username)}</span>
                        </div>
                    `).join('');
                }
            })
            .catch(() => {
                const listEl = document.getElementById('discord-members-list');
                if (listEl) listEl.innerHTML = '<div class="loading">Unable to load</div>';
            });
    }
});
