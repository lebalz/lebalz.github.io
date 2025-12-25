alias reset_time='echo "sudo hwclock -s" && sudo hwclock -s'
alias rtime=reset_time
alias is_psql_live='if [[ $(service postgresql status) == *down ]]; then echo "false"; else echo "true"; fi'
alias start_psql='echo "sudo service postgresql start" && if [[ $(is_psql_live) == false ]]; then sudo service postgresql start; fi'
alias spsql=start_psql
alias sapi='(cd ~/git-code/bh0fer/ofi-api && start_psql && rtime && yarn run start)'
alias sinf='(cd ~/git-code/gbsl-informatik/teaching-api && start_psql && yarn run dev)'
alias open='explorer.exe'
alias oblog='(cd ~/git-code/bh0fer/ofi-blog && code .)'

alias nano='nano --mouse'

alias eapi='(cd ~/git-code/bh0fer/events-api && code . && start_psql)'
alias eapp='(cd ~/git-code/bh0fer/events-app && code .)'
alias sevent='eapp & eapi'

alias lazydocker=$HOME/.local/bin/lazydocker
