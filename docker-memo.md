
Commands below are entered in the *Git Bash* console on a Windows 7 64x OS. The Docker version used here is **1.9.1, build a34a1d5**.

Original version is available on the [Docker site](https://docs.docker.com/engine/examples/running_ssh_service/).

# start Machine

Launch `start.sh` from the Docker installation folder :

	Raoul@Raoul-PC MINGW64 ~
	$ cd /f/Programs/Docker\ Toolbox/
	
	Raoul@Raoul-PC MINGW64 /f/Programs/Docker Toolbox
	$ start.sh
	Machine default already exists in VirtualBox.
	Starting machine default...
	(default) Starting VM...

                        ##         .
                  ## ## ##        ==
               ## ## ## ## ##    ===
           /"""""""""""""""""\___/ ===
      ~~~ {~~ ~~~~ ~~~ ~~~~ ~~~ ~ /  ===- ~~~
           \______ o           __/
             \    \         __/
              \____\_______/

	docker is configured to use the default machine with IP 192.168.99.100
	For help getting started, check out the docs at https://docs.docker.com

<<<<<<< HEAD
The default docker machine is running at **192.168.99.100**. You can add a new record to your etc/hosts file (in Windows) 
=======
Here the default docker machine is running at **192.168.99.100**. You can add a new record to your etc/hosts file (in Windows) 
>>>>>>> add Docker memo
to create a local DNS name for your Docker VM.

- hosts file : `C:\Windows\System32\drivers\etc`
	
<<<<<<< HEAD
**TIPS** : You can connect to the *default* VM using SSH with following credentials :
=======
**TIPS** : connect to the *default* VM using SSH with following credentials :
>>>>>>> add Docker memo
 
- username : `docker`
- password : `tcuser`

## environment

From a new Git bash instance, inject environment variables with the following command : 

	$ eval $(docker-machine env --shell=bash default)



# run an image

List all images, choose one and connect to it (I choose *ubuntu:raoul*) : 

	$ docker images -a
	REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
	ubuntu              raoul               029a0a7fe871        23 hours ago        187.9 MB
	ubuntu              latest              f4b65fdd0155        23 hours ago        187.9 MB
	ubuntu              14.04               c4bea91afef3        2 days ago          187.9 MB

	
	$ winpty docker run -it ubuntu:raoul bash
	
Note the **winpty** command.

We are now in the *bash* of our ubuntu image. Let's check the version : 

	root@7d0f19f11160:/# uname -a
	Linux 7d0f19f11160 4.1.13-boot2docker #1 SMP Fri Nov 20 19:05:50 UTC 2015 x86_64 x86_64 x86_64 GNU/Linux

<<<<<<< HEAD
# An sshd image
=======
# A sshd image
>>>>>>> add Docker memo
## build 
Create a folder and a *Dockerfile* file with name `docker-file-sshd`. Then build the image under the tag *eg_sshd*.


	Raoul@Raoul-PC MINGW64 /f/Project/docker-files
	$ docker build -t eg_sshd -f dockerfile-sshd .
	Sending build context to Docker daemon  2.56 kB
	Step 1 : FROM ubuntu:14.04
	etc ...

Be patient.. after a few minutes, your image is ready.
 
## test

Let's run it in background (*-d*) and publishing all exposed ports to random ports (*-P*). The name *test_sshd* is assigned
 to the container (*--name*)

	$ docker run -d -P --name test_sshd eg_sshd
	e958400f35aac44338248770cc9f9361754099a052c88116ac68c2a954a46d02

We must now find out whot is the mapping for the SSH port 22. This can be obtained using the *ps* or *port* command. 

Using *ps* : 

	$ docker ps
	CONTAINER ID        IMAGE               COMMAND               CREATED             STATUS              PORTS                   NAMES
	f1940e9e8a6e        eg_sshd             "/usr/sbin/sshd -D"   14 seconds ago      Up 5 seconds        0.0.0.0:32769->22/tcp   test_sshd

Using *port* : 

	$ docker port test_sshd 22
	0.0.0.0:32769

So we have a winner : port 32769 !

## connect

Using your favorite SSH client, connect to your container :

- for this example ip = 192.168.99.100
- username : root
- password : screencast

## stop & clean-up

Once you have enough, stop the container and you can also remove it.

	$ docker stop test_sshd
	$ docker rm test_sshd
	$ docker rmi eg_sshd
	
# stop Machine
	
	> docker-machine stop default
	$ (default) Stopping VM...
	
	