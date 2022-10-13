# Content Management System

Content Management System (CMS) is a back-office program for editors that allows them to alter data in their websites. If you know Wordpress, this should sound familiar to you. Although there are numerous systems to be used, we were never fully satisfied with them so we began developing our own CMS.

Let us repeat: the CMS is used only for websites. The most important aspect is short time to market. In the end, you should be able to define whole websites in a few clicks and do not think about backend or CMS. Just create ~~unique~~ design and you are ready to go.

## Principles

### Built with tools we are already using

We are already using Fastify, Vue, dynamics and friends in other projects, so we can reuse our experiences in CMS. Or the other way around! We can use the CMS as a test site for new ideas and, if successful, implement those ideas into our flagship products.

Sure, it is easier to use Wordpress like everybody else, but the company is JavaScript oriented right now and we like to advertise that we have our in-house built solution. Not to say it is way more convenient to use modern frontend tools to build websites that to use the old grumpy PHP (loosely translated to Czech "Pěkně Hustý Programování").

### The user should not have too much freedom

This is common mistake a lot of CMS are doing. If you give the user too much freedom, things will break. For example Elementor, a popular plugin for Wordpress, allows users to edit things such as margin, padding, text color, font and everything on almost any element. The real question is: if the user is capable of understanding all these properties, should not they be able to write the code directly?

And we don't even started with the fact, that if you let user break the design system someone laid out, the site would look really bad. Just look at typical _homemade noob_ presentation. No, the users cannot have freedom.

On the other hand, they need to be able to update almost anything on the website without needing the developer. We, as the developers, must set line, where we stop users from breaking our work. _Remember that their website is our calling card._

## Technologies

-  Vue (`<script setup>` syntax)
   -  PrimeVue
-  Meowtify
   -  Fastify
   -  Mongoose
-  Dynamics ecosystem
