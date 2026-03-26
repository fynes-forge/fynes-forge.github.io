---
id: Installing Git
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Before you can start using Git, you need to install it on your computer. Below are step-by-step instructions for installing Git on Windows, macOS, and Linux.



<Tabs>
  <TabItem value="Windows" label="Windows" default>

    1. Download Git for Windows
        
        Visit the official Git website and download the installer:
        👉 https://git-scm.com/download/win

    2. Run the Installer
        
        Open the .exe file you downloaded and follow the setup wizard.

    3. Recommended Settings During Installation:

        * Use the default editor (or select one you prefer).
        
        * Choose "Git from the command line and also from 3rd-party software".
        
        * Choose HTTPS transport backend: “Use the OpenSSL library”.
        
        * Line endings: “Checkout Windows-style, commit Unix-style line endings”.

    4. Verify the Installation
        Open Command Prompt or Git Bash and run:

        ```bash
        git --version
        ```

        You should see something like git version 2.x.x.

  </TabItem>
  <TabItem value="MacOS" label="Mac">

    **Option 1: Using Homebrew (Recommended)**

        1. Install Homebrew (if you don’t have it):
        
        ```bash
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        ```

        2. Install Git:
        
        ```brash
        brew install git
        ```
        
        3. Verify Installation:
        
        ```bash
        git --version
        ```

    **Option 2: Install Xcode Command Line Tools**

        If you have Xcode or run git from the terminal for the first time, macOS may prompt you to install the Command Line Developer Tools:

        ```bash
        git --version
        ```

        If Git is not installed, you will be prompted to install it.

  </TabItem>
  <TabItem value=":Linux" label="Linux">

    **Ubuntu/Debian-based Systems:**

        1. Update Package Index:

        ```bash
        sudo apt update
        ```

        2. Install Git:

        ```bash
        sudo apt install git
        ```


    **Fedora:**
    
        1. Install Git:
        ```bash
        sudo dnf install git
        ```


    **Arch Linux:**

        1. Install Git:
        ```bash
        sudo pacman -S git
        ```

    **Verify Installation:**
    ```bash 
    git --version
    ```

  </TabItem>
</Tabs>