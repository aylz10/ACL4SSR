import json
import time
import urllib2

def purge(branch):
    url="https://purge.jsdelivr.net/gh/ACL4SSR/ACL4SSR@%s/" % branch
    
    response=json.loads(urllib2.urlopen(urllib2.Request(url)).read(),strict=False)
  
    fastly=True
    for item in response['fastly']:
        print item
        if item['status']!='ok':
            fastly=False
    print fastly
            
    maxcdn=True
    if response['maxcdn']['code']!=200:
        maxcdn=False
    print maxcdn
        
    cloudflare=True
    if response['cloudflare']!=True:
        cloudflare=False
    print cloudflare
        
    quantil=True
    if not response['quantil'].find("success"):
        quantil=False
    print quantil
        
    return (fastly and maxcdn and cloudflare and quantil)
    
def run(branch):
    count=0
    result=False
    while(count<=4 and result==False):
        result=purge(branch)
        count=count+1
        if result==False:
            time.sleep(20)
    return result
    
def main():
    master=run("master")
    latest=run("latest")
    
    if (master and latest)==True:
        exit(0)
    else:
        exit(1)
    
if __name__ == '__main__':
    main()